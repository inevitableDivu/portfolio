import { beamStyle } from "@/constants/data";
import { cn } from "@/lib/utils";
import React from "react";

type HeadingProps = React.PropsWithChildren<{
	className?: string;
}>;

function Heading({ children, className }: HeadingProps) {
	return (
		<h1
			className={cn(
				"uppercase font-semibold text-4xl tracking-widest text-slate-900 dark:text-slate-200 mt-8 mb-6",
				beamStyle,
				className
			)}
		>
			{children}
		</h1>
	);
}

export default Heading;
