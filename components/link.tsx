import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type CustomLinkProps = React.PropsWithChildren &
	React.ComponentProps<typeof Link> & {
		wrapperClass?: string;
		underlineClass?: string;
	};

function CustomLink({
	children,
	className,
	wrapperClass,
	underlineClass,
	...props
}: CustomLinkProps) {
	return (
		<Link {...props} className={cn(wrapperClass)}>
			<span
				className={cn(
					"text-xs xl:text-sm relative group font-medium text-stone-600 dark:text-stone-300",
					className
				)}
			>
				{children}
				<div
					className={cn(
						"absolute origin-left border-0 group-hover:border border-stone-600 dark:bg-stone-300 w-0 group-hover:w-full transition-all duration-500 bottom-0 inset-x-0 mx-auto",
						underlineClass
					)}
				/>
			</span>
		</Link>
	);
}

export default CustomLink;
