import { BackgroundBeams } from "@/components/background-beams";
import MouseTracker from "@/components/mouse-tracker";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Divyansh Pandey",
		template: "%s | Divyansh Pandey",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
				<MouseTracker />
				<BackgroundBeams />

				<div className="fixed inset-0 z-50 p-4 sm:p-8 md:p-10 max-h-full overflow-y-auto">
					<div className="max-h-full inset-y-0 max-w-6xl mx-auto">
						<Navbar />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
