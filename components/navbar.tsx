import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./logo";

const navLinks = [
  { label: "Home", path: "/", number: "01" },
  { label: "About Me", path: "/about", number: "02" },
  {
    label: "Resume",
    path: "https://drive.google.com/file/d/1iHku0AHEEBZzJwNe9bkS_ichaluFfxsd/view?usp=sharing",
    number: "03",
    target: "_blank",
  },
  { label: "Contact Me", path: "/contact", number: "04" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)",
    transition: {
      duration: 0.5,
      ease: ease as unknown as [number, number, number, number],
    },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)",
    transition: {
      duration: 0.6,
      ease: ease as unknown as [number, number, number, number],
    },
  },
};

const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const linkVariants = {
  closed: { opacity: 0, x: 60, filter: "blur(8px)" },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: cubicEase },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -40,
    filter: "blur(6px)",
    transition: { delay: i * 0.05, duration: 0.3, ease: cubicEase },
  }),
};

const lineVariants = {
  closed: { scaleX: 0 },
  open: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.2 + i * 0.1, duration: 0.4, ease: cubicEase },
  }),
  exit: { scaleX: 0, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-999 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-5xl">
          <Link
            id="cardHover"
            href="/"
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <Logo id="cardHover" className="h-10 w-10 text-current" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                id="cardHover"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
                target={link.target}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <motion.button
            onClick={() => setOpen(!open)}
            className="sm:hidden relative z-60 text-foreground p-2 -mr-2"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HugeiconsIcon icon={X} size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <HugeiconsIcon icon={Menu} size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-55 bg-background flex flex-col justify-center sm:hidden"
          >
            {/* Decorative floating orb */}
            <motion.div
              className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-16 w-48 h-48 rounded-full bg-accent/20 blur-3xl"
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <div className="px-8 space-y-2">
              {navLinks.map((link, i) => (
                <div key={link.path}>
                  {/* Separator line */}
                  <motion.div
                    variants={lineVariants}
                    custom={i}
                    initial="closed"
                    animate="open"
                    exit="exit"
                    className="h-px bg-border/60 origin-left"
                  />

                  <motion.div
                    variants={linkVariants}
                    custom={i}
                    initial="closed"
                    animate="open"
                    exit="exit"
                  >
                    <Link
                      href={link.path}
                      onClick={() => setOpen(false)}
                      target={link.target}
                      className="group flex items-center gap-4 py-6"
                    >
                      {/* Number */}
                      <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
                        {link.number}
                      </span>

                      {/* Label */}
                      <motion.span
                        className={cn(
                          "text-3xl font-display font-bold tracking-tight transition-colors duration-300",
                          pathname === link.path
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary",
                        )}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        {link.label}
                      </motion.span>

                      {/* Active dot indicator */}
                      {pathname === link.path && (
                        <motion.div
                          layoutId="nav-active-dot"
                          className="w-2 h-2 rounded-full bg-primary ml-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover arrow */}
                      <motion.span
                        className="ml-auto text-muted-foreground/0 group-hover:text-primary text-lg transition-colors duration-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              ))}

              {/* Final separator */}
              <motion.div
                variants={lineVariants}
                custom={navLinks.length}
                initial="closed"
                animate="open"
                exit="exit"
                className="h-px bg-border/60 origin-left"
              />
            </div>

            {/* Bottom tagline */}
            <motion.p
              className="absolute bottom-12 left-8 text-xs text-muted-foreground/50 tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Divyansh Pandey · 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
