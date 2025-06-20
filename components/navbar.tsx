"use client";

import Logo from "@/assets/logo";
import { useDimensions } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, color, motion, useCycle } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import CustomLink from "./link";
import { useRouter } from "next/router";
import { useTheme } from "./context/theme.provider";
import MenuIcon from "@/assets/menu";

export type Routes = "home" | "about" | "projects" | "resume" | "contact";

export type NavigationType = {
	[key in Routes]: {
		hideFromNav: boolean;
		name: string;
		href: `/${Routes}`;
		target?: string;
		mapRouteTo?: string;
	};
};

// export type RoutesType =

export const navigation: NavigationType = {
	home: { hideFromNav: true, name: "Home", href: "/home", mapRouteTo: "/" },
	about: { hideFromNav: false, name: "About me", href: "/about" },
	projects: { hideFromNav: false, name: "My Projects", href: "/projects" },
	resume: {
		hideFromNav: false,
		name: "Resume",
		href: "/resume",
		mapRouteTo:
			"https://drive.google.com/file/d/16CrTWivHQH0rWxZTlo_BfVjh4XJXjKsX/view?usp=sharing",
		target: "_blank",
	},
	contact: { hideFromNav: false, name: "Contact me", href: "/contact" },
};

type ThemeProp = {
	color?: string;
};

function Navbar() {
	const pathname = usePathname();
	return (
		<nav className="w-full flex items-center justify-between lg:px-5 p-0 sm:pt-6 md:py-10 sm:max-w-xl mx-auto md:max-w-none transition-all duration-150 z-30">
			<div className="z-10 flex-shrink-0">
				<Link href="/" className={pathname === "/" ? "pointer-events-none" : ""}>
					<Logo className="h-10 w-10 text-black dark:text-white" />
				</Link>
			</div>
			<div className="hidden md:flex">
				<ul className="flex gap-2 items-center" id="cardHover">
					<AnimatePresence mode="sync" presenceAffectsLayout>
						{Object.values(navigation).map((nav) =>
							!nav.hideFromNav ? (
								<CustomLink
									key={nav.href}
									href={nav.mapRouteTo || nav.href}
									target={nav.target}
									passHref
									className={cn("px-4 py-3", {
										"font-semibold": pathname === nav.href,
									})}
								>
									{nav.name}
								</CustomLink>
							) : null
						)}
					</AnimatePresence>
				</ul>
			</div>
			<div className="md:hidden">
				<Sidebar />
			</div>
		</nav>
	);
}

const ThemeButton = (props: ThemeProp) => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		}
	}, [isDark]);

	return (
		<button
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={cn(
				"h-8 w-8 rounded-full overflow-hidden text-black dark:text-white hidden md:inline",
				props.color
			)}
		>
			<motion.div className={cn("h-full")} animate={{ translateY: isDark ? "-100%" : "0%" }}>
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
	open: ({ height, width }: ReturnType<typeof useDimensions>) => ({
		height: 500,
		width: width > 576 ? 380 : width - 10,
		top: -10,
		right: -10,
		transition: {
			duration: 0.5,
			ease: [0.76, 0, 0.24, 1],
			type: "tween",
		},
	}),
	closed: {
		height: 40,
		width: "100%",
		right: 0,
		top: 0,
		transition: {
			duration: 0.5,
			delay: 0.25,
			ease: [0.76, 0, 0.24, 1],
			type: "tween",
		},
	},
};

export const Sidebar = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const { width } = useDimensions();
	const router = useRouter();

	useEffect(() => {
		toggleOpen(0);
	}, [router.route]);

	useEffect(() => {
		if (width > 768) toggleOpen(0);
	}, [width]);

	useEffect(() => {
		let container = document.getElementById("content_container");
		if (container) {
			if (isOpen) {
				container.style.overflowY = "hidden";
			} else {
				container.style.overflowY = "auto";
			}
		}

		return () => {
			if (container) container.style.overflowY = "auto";
		};
	}, [isOpen]);

	return (
		<>
			<div className="relative z-50">
				<button
					onClick={() => toggleOpen()}
					className={
						"rounded-full h-6 aspect-square text-sm font-semibold uppercase tracking-wider z-[99] select-none relative"
					}
				>
					<MenuIcon isOpen={isOpen} />
				</button>

				<div
					className={cn(
						"fixed inset-0 overflow-hidden flex flex-col transition-all visible",
						{
							"delay-700 none invisible": !isOpen,
						}
					)}
				>
					{new Array(4).fill(0).map((_, index) => (
						<motion.div
							key={index}
							animate={{
								translateX: isOpen ? 0 : -window.innerWidth,
							}}
							transition={{
								type: "tween",
								delay: index * 0.15,
							}}
							className="flex-[0.25] bg-slate-900"
						></motion.div>
					))}
				</div>
			</div>
		</>
	);
};

export default Navbar;
