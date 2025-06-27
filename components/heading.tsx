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
				"text-theme-purple text-3xl lg:text-5xl font-medium my-6",
				beamStyle,
				className
			)}
		>
			{children}
		</h1>
	);
}

export default Heading;
