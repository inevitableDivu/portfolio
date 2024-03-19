"use client";

import Logo from "@/assets/logo";
import { useDimensions } from "@/hooks";
import { cn } from "@/lib/utils";
import { motion, useCycle } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect } from "react";

const navigations = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

function Navbar() {
	return (
		<nav className="flex items-center justify-between py-3 md:py-6 lg:px-5">
			<div className="z-10">
				<Logo className="h-16 w-16 text-black dark:text-white" />
			</div>
			<div className="hidden md:flex">
				<ul className="flex gap-2">
					{navigations.map((nav) => (
						<Link href={nav.href} key={nav.name}>
							<li className="text-xs xl:text-sm px-4 py-3 relative group font-medium text-stone-600 dark:text-stone-300">
								{nav.name}
								<div className="absolute origin-center h-0.5 bg-stone-500 dark:bg-stone-400 w-0 group-hover:w-full transition-all duration-[400ms] bottom-0 inset-x-0 mx-auto" />
							</li>
						</Link>
					))}

					<ThemeButton />
				</ul>
			</div>
			<div className="md:hidden">
				<ThemeButton />
			</div>
		</nav>
	);
}

const ThemeButton = () => {
	const [isDark, toggleTheme] = useCycle(false, true);

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	useLayoutEffect(() => {
		let theme = localStorage.theme;
		if (theme === "dark") {
			toggleTheme(1);
		}
	}, []);

	return (
		<button
			onClick={() => toggleTheme()}
			className={cn("h-8 w-8 rounded-full overflow-hidden", {
				"text-white": isDark,
				"text-black": !isDark,
			})}
		>
			<motion.div className="h-full" animate={{ translateY: isDark ? "-100%" : "0%" }}>
				<div className="h-full flex items-center justify-center">
					<SunIcon className="h-6 w-6" />
				</div>
				<div className="h-full flex items-center justify-center">
					<MoonIcon className="h-6 w-6" />
				</div>
			</motion.div>
		</button>
	);
};

const sidebar = {
	open: ({ height }: { height: number }) => ({
		clipPath: `circle(${height * 2 + 200}px at 24px 24px)`,
		transition: {
			type: "spring",
			stiffness: 40,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: `circle(84px at 24px 24px)`,
		transition: {
			delay: 0.2,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export const Sidebar = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const { height, width } = useDimensions();

	return (
		<motion.div
			initial={false}
			className=""
			custom={{ height, width }}
			animate={isOpen ? "open" : "closed"}
		>
			<motion.div
				className="fixed h-12 w-12 rounded-full top-4 right-4 bg-black"
				variants={sidebar}
				initial={false}
				custom={{ height, width }}
			></motion.div>
			<MenuToggle toggle={() => toggleOpen()} {...{ isOpen }} />
		</motion.div>
	);
};

const Path = (props: any) => (
	<motion.path fill="transparent" strokeWidth="3" strokeLinecap="round" {...props} />
);

export const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
	<button
		onClick={toggle}
		className="z-50 absolute h-12 w-12 rounded-full top-4 right-4 flex items-center justify-center"
	>
		<svg width="22" height="19" viewBox="0 0 22 19" className="z-50">
			<Path
				variants={{
					closed: { d: "M 2 2.5 L 20 2.5" },
					open: { d: "M 3 16.5 L 17 2.5" },
				}}
				stroke={"white"}
			/>
			<Path
				d="M 2 9.423 L 20 9.423"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				transition={{ duration: 0.1 }}
				stroke={"white"}
			/>
			<Path
				variants={{
					closed: { d: "M 2 16.346 L 20 16.346" },
					open: { d: "M 3 2.5 L 17 16.346" },
				}}
				stroke={"white"}
			/>
		</svg>
	</button>
);

export default Navbar;
