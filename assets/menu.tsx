import { cn } from "@/lib/utils";
import React from "react";

interface IMenuIconProps extends React.SVGProps<SVGSVGElement> {
	isOpen?: boolean;
}

function MenuIcon(props: IMenuIconProps) {
	return (
		<div className="h-full flex flex-col gap-2">
			<div
				className={cn("h-0.5 w-3 bg-black transition-all duration-300 delay-150", {
					"rotate-45 translate-y-1.5 translate-x-0.5 bg-white": props.isOpen,
				})}
			/>
			<div
				className={cn("h-0.5 w-6 bg-black transition-all duration-300 delay-150", {
					"-rotate-45 bg-white": props.isOpen,
				})}
			/>
			<div
				className={cn("h-0.5 w-3 bg-black self-end transition-all duration-300 delay-150", {
					"rotate-45 -translate-y-1.5 -translate-x-0.5 bg-white": props.isOpen,
				})}
			/>
		</div>
	);
}

export default MenuIcon;
