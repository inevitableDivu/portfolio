import MouseTracker from "@/components/mouse-tracker";
import Navbar from "@/components/navbar";
import { background, styles } from "@/constants/data";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { GetStaticPropsResult } from "next";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

import "@/styles/globals.css";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	subsets: ["latin"],
});

export default function App({ Component, pageProps, router }: AppProps) {
	const Background = background[styles.background];

	return (
		<>
			{styles.background === "boxes" && (
				<div className="absolute inset-0 w-full h-full bg-slate-600/50 z-20 [mask-image:radial-gradient(transparent,white)] dark:[mask-image:radial-gradient(transparent,black)] pointer-events-none" />
			)}

			<Background />
			<div
				className={cn("p-4 sm:p-5 max-h-full overflow-y-auto overflow-x-hidden h-full", {
					"fixed inset-0 z-10": styles.background === "beam",
				})}
			>
				<div
					className={cn(
						"max-h-full inset-y-0 max-w-6xl mx-auto overflow-x-hidden sm:overflow-y-hidden",
						poppins.className
					)}
				>
					{styles.cursor && styles.background !== "boxes" && <MouseTracker />}

					<Navbar />
					<AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
						<Component key={router.route} {...pageProps} />
					</AnimatePresence>
				</div>
			</div>
		</>
	);
}

export function getStaticProps(): GetStaticPropsResult<{}> {
	return {
		props: {},
	};
}
