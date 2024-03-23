import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TextProps = React.PropsWithChildren<{
	href?: string;
}>;

function Text({ children, href }: TextProps) {
	const item = href
		? {
				component: Link,
				props: { href },
		  }
		: {
				component: "span",
				props: {},
		  };
	return (
		// @ts-ignore
		<item.component
			{...item.props}
			className={cn("font-semibold text-sm text-slate-700 dark:text-purple-500", {
				"uppercase px-1.5 py-0.5 bg-gray-300 dark:bg-gray-700 rounded-lg": !!href,
			})}
		>
			{children}
		</item.component>
	);
}

export default Text;
