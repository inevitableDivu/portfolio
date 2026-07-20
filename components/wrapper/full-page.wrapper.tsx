import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown } from "@hugeicons/core-free-icons";

/** Context so child sections can register sub-step handlers */
interface SectionNavContext {
  registerSubNav: (handler: (dir: number) => boolean) => void;
  unregisterSubNav: () => void;
}
const SectionNavCtx = createContext<SectionNavContext>({
  registerSubNav: () => {},
  unregisterSubNav: () => {},
});
export const useSectionNav = () => useContext(SectionNavCtx);

interface Section {
  id: string;
  label: string;
  content: ReactNode;
}

interface FullPageSectionsProps {
  sections: Section[];
}

const sectionVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "spring" as const, stiffness: 200, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      y: { type: "spring" as const, stiffness: 200, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

const FullPageSections = ({ sections }: FullPageSectionsProps) => {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([
    0, 0,
  ]);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);
  const subNavHandler = useRef<((dir: number) => boolean) | null>(null);

  const registerSubNav = useCallback((handler: (dir: number) => boolean) => {
    subNavHandler.current = handler;
  }, []);
  const unregisterSubNav = useCallback(() => {
    subNavHandler.current = null;
  }, []);

  const navigate = useCallback(
    (newIndex: number, dir: number) => {
      if (isTransitioning.current) return;

      // Let child section consume the scroll first
      if (subNavHandler.current) {
        const consumed = subNavHandler.current(dir);
        if (consumed) return;
      }

      if (newIndex < 0 || newIndex >= sections.length) return;
      if (newIndex === activeIndex) return;
      isTransitioning.current = true;
      setActive([newIndex, dir]);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 700);
    },
    [activeIndex, sections.length],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        navigate(activeIndex + 1, 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigate(activeIndex - 1, -1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, navigate]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      let target = e.target as HTMLElement | null;
      let isScrollable = false;
      while (target && target !== document.body) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === "auto" || style.overflowY === "scroll") {
            const isScrollingDown = e.deltaY > 0;
            const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
            const isAtTop = target.scrollTop <= 0;
            
            if ((isScrollingDown && !isAtBottom) || (!isScrollingDown && !isAtTop)) {
              isScrollable = true;
              break;
            }
          }
        }
        target = target.parentElement;
      }

      if (isScrollable) return;
      
      e.preventDefault();
      if (Math.abs(e.deltaY) < 30) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      navigate(activeIndex + dir, dir);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, navigate]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      let target = e.target as HTMLElement | null;
      let isScrollable = false;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const isSwipingUp = delta > 0; // swiping up means scrolling down

      while (target && target !== document.body) {
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === "auto" || style.overflowY === "scroll") {
            const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
            const isAtTop = target.scrollTop <= 0;
            
            if ((isSwipingUp && !isAtBottom) || (!isSwipingUp && !isAtTop)) {
              isScrollable = true;
              break;
            }
          }
        }
        target = target.parentElement;
      }

      if (isScrollable) return;

      if (Math.abs(delta) < 50) return;
      const dir = delta > 0 ? 1 : -1;
      navigate(activeIndex + dir, dir);
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, navigate]);

  const hasMore = activeIndex < sections.length - 1;

  return (
    <SectionNavCtx.Provider value={{ registerSubNav, unregisterSubNav }}>
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={sections[activeIndex].id}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="w-full h-full overflow-y-auto pt-24 pb-12 flex flex-col">
              <div className="m-auto w-full">
                {sections[activeIndex].content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        {sections.length > 1 && (
          <div className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => navigate(idx, idx > activeIndex ? 1 : -1)}
                aria-label={`Go to ${section.label}`}
                className="group relative flex items-center"
              >
                <span className="absolute right-6 whitespace-nowrap text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {section.label}
                </span>
                <motion.div
                  className="rounded-full border border-border/60"
                  animate={{
                    width: idx === activeIndex ? 10 : 6,
                    height: idx === activeIndex ? 10 : 6,
                    backgroundColor:
                      idx === activeIndex
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <AnimatePresence>
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <HugeiconsIcon
                  icon={ChevronDown}
                  size={18}
                  className="text-muted-foreground/50"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionNavCtx.Provider>
  );
};

export default FullPageSections;
