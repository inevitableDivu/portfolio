import React from "react";
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25 } },
};

export function AnimationWrapper({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      key={location.pathname}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-screen w-screen overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
