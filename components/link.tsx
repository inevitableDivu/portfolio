import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

type CustomLinkProps = React.PropsWithChildren &
	React.ComponentProps<typeof Link> & {
		wrapperClass?: string;
		underlineClass?: string;
		href: string;
	};

function CustomLink({
	children,
	className,
	wrapperClass,
	underlineClass,
	...props
}: CustomLinkProps) {
	return (
		<motion.span
			key={props.href}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transitionEnd: {
					display: "none",
				},
			}}
			transition={{
				type: "tween",
			}}
		>
			<Link {...props} className={cn(wrapperClass)}>
				<span
					id="cardHover"
					className={cn(
						"text-xs xl:text-sm relative group font-medium text-slate-600 dark:text-slate-300",
						className
					)}
				>
					{children}
					<div
						className={cn(
							"absolute origin-left border-0 group-hover:border border-slate-600 dark:bg-slate-300 w-0 group-hover:w-full transition-all duration-500 bottom-0 inset-x-0 mx-auto",
							underlineClass
						)}
					/>
				</span>
			</Link>
		</motion.span>
	);
}

export default CustomLink;
