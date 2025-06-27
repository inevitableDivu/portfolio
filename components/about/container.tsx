import { cn } from "@/lib/utils";
import React from "react";

function Container({
	children,
	className,
	...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
	return (
		<div className={cn("mb-16", className)} {...props}>
			{children}
		</div>
	);
}

export default Container;
