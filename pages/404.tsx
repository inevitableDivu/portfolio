"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        className="text-center space-y-8 max-w-md"
      >
        <motion.div variants={fadeUp} className="space-y-4">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-primary">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground leading-relaxed"
        >
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </motion.p>

        <motion.div variants={fadeUp} className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <HugeiconsIcon icon={ArrowLeft} className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
