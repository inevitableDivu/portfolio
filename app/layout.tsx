import MouseTracker from "@/components/mouse-tracker";
import Navbar from "@/components/navbar";
import { background, styles } from "@/constants/data";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Home | Divyansh Pandey",
		template: "%s | Divyansh Pandey",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const Background = background[styles.background];

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"bg-background antialiased overflow-hidden fixed inset-0",
					poppins.className
				)}
				suppressHydrationWarning
			>
				{styles.background === "boxes" && (
					<div className="absolute inset-0 w-full h-full bg-slate-600/50 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
				)}
				{styles.cursor && styles.background !== "boxes" && <MouseTracker />}
				<Background />
				<div
					className={cn("p-4 sm:p-8 md:p-10 max-h-full overflow-y-auto", {
						"fixed inset-0 z-10": styles.background === "beam",
					})}
				>
					<div className="max-h-full inset-y-0 max-w-6xl mx-auto">
						<Navbar />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
