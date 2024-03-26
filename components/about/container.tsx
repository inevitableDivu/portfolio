import { cn } from "@/lib/utils";
import React from "react";

function Container({ children }: React.PropsWithChildren) {
	return (
		<div className="relative pl-5 before:content-[''] before:w-[1px] before:absolute before:bg-black/40 dark:before:bg-gray-600 before:bottom-4 before:top-2 before:left-0 space-y-10">
			{children}
		</div>
	);
}

const Heading = ({
	children,
	subHeading = false,
}: React.PropsWithChildren<{ subHeading?: boolean }>) => (
	<h2
		className={cn("font-semibold text-xl relative flex items-center", {
			"text-base left-6": subHeading,
		})}
	>
		<span>{children}</span>
		{subHeading && <div className={cn("absolute h-[1px] w-4 bg-black/40 -left-11")} />}
		<div
			className={cn(
				"absolute h-4 w-4 rounded-full border-2 border-black/70 dark:border-gray-400 bg-gray-200 dark:bg-gray-700 -left-7",
				{ "h-3 w-3": subHeading }
			)}
		/>
	</h2>
);

const Content = ({ children }: React.PropsWithChildren) => <div>{children}</div>;

const Description = ({ children }: React.PropsWithChildren) => (
	<p className="text-sm pt-3 leading-loose">{children}</p>
);

Container.Title = Heading;
Container.Body = Description;
Container.Content = Content;

Container.displayName = "AboutContainer";

export default Container;
