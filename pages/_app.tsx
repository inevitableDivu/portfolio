import BackgroundBeams from "@/components/beams.background";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import MouseTracker from "@/components/tracker";

import { Playfair_Display, Outfit } from "next/font/google";

const pfDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
});

const outfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div
      className={`${pfDisplay.className} ${outfitFont.className} cursor-none`}
    >
      {/* <BackgroundBeams /> */}
      <MouseTracker />
      <Toaster />

      <Navbar />

      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}
