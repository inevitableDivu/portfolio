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
      const delta = touchStartY.current - e.changedTouches[0].clientY;
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
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden pt-16">
              {sections[activeIndex].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        {sections.length > 1 && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
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
                    width: idx === activeIndex ? 12 : 8,
                    height: idx === activeIndex ? 12 : 8,
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
