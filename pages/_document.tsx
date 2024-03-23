import { cn } from "@/lib/utils";
import { Head, Html, Main, NextScript } from "next/document";

export default function DocumentMain() {
	return (
		<Html lang="en">
			<Head />
			<body
				className={cn("bg-background antialiased overflow-hidden fixed inset-0")}
				suppressHydrationWarning
			>
				<Main />

				<NextScript />
			</body>
		</Html>
	);
}
