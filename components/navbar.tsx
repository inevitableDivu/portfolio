"use client";

import Logo from "@/assets/logo";
import { useDimensions } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import CustomLink from "./link";
import { useRouter } from "next/router";

export const navigation = {
	"/": { name: "Home", href: "/" },
	"/about": { name: "About", href: "/about" },
	"/projects": { name: "Projects", href: "/projects" },
	"/resume": { name: "Resume", href: "/resume" },
	"/contact": { name: "Contact", href: "/contact" },
};

type ThemeProp = {
	onLoad(loaded: boolean): void;
};

function Navbar({ onLoad }: ThemeProp) {
	const pathname = usePathname();
	return (
		<nav className="flex items-center justify-between lg:px-5 p-0 sm:pt-6 md:py-10 sm:max-w-xl mx-auto md:max-w-none transition-all duration-150 z-30">
			<div className="z-10 flex-shrink-0">
				<Link href="/" className={pathname === "/" ? "pointer-events-none" : ""}>
					<Logo className="h-10 w-10 text-black dark:text-white" />
				</Link>
			</div>
			<div className="hidden md:flex">
				<ul className="flex gap-2 items-center" id="cardHover">
					<AnimatePresence mode="sync" presenceAffectsLayout>
						{Object.values(navigation).map((nav) =>
							nav.href !== "/" ? (
								<CustomLink
									key={nav.href}
									href={nav.href}
									className={cn("px-4 py-3", {
										hidden: pathname === nav.href,
									})}
								>
									{nav.name}
								</CustomLink>
							) : null
						)}
					</AnimatePresence>

					<ThemeButton {...{ onLoad }} />
				</ul>
			</div>
			<div className="md:hidden">
				<Sidebar />
			</div>
		</nav>
	);
}

const ThemeButton = (props: ThemeProp) => {
	const [isDark, toggleTheme] = useCycle(false, true);
	const ref = useRef<boolean>(true);

	useEffect(() => {
		if (ref.current) {
			ref.current = false;
			return;
		}

		props.onLoad(true);
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
			toggleTheme(1);
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		}
	}, [isDark, ref]);

	useEffect(() => {
		let theme = localStorage.theme;
		if (theme === "dark") {
			toggleTheme(1);
		} else {
			toggleTheme(0);
			props.onLoad(true);
		}
	}, []);

	return (
		<button
			onClick={() => toggleTheme()}
			className={cn("h-8 w-8 rounded-full overflow-hidden text-black dark:text-white")}
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
	const { height, width } = useDimensions();
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
				container.style.overflow = "hidden";
			} else {
				container.style.overflow = "auto";
			}
		}

		return () => {
			if (container) container.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<>
			<div className="relative z-[99] flex">
				<motion.div
					variants={sidebar}
					custom={{ height, width }}
					animate={isOpen ? "open" : "closed"}
					className="absolute bg-theme-purple dark:bg-theme-purple z-[99] rounded-3xl select-none shadow-md"
				>
					<AnimatePresence>
						{isOpen && (
							<div className="px-10 pt-20 pb-8 flex flex-col gap-8 justify-between h-full">
								<div className="flex flex-col gap-8 ">
									{Object.values(navigation).map((nav, index) => (
										<Link
											href={nav.href}
											key={nav.href}
											style={{
												perspective: "90px",
												perspectiveOrigin: "top",
											}}
											passHref
										>
											<motion.div
												initial={{ opacity: 0, rotateX: 45 }}
												animate={{
													opacity: 1,
													rotateX: 0,
													transition: {
														delay: 0.5 + index * 0.1,
													},
												}}
												exit={{
													opacity: 0,
												}}
												className="text-3xl text-white font-semibold"
											>
												{nav.name}
											</motion.div>
										</Link>
									))}
								</div>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
										transition: {
											delay: 0.75,
										},
									}}
									exit={{ opacity: 0 }}
									className=""
								>
									<ThemeButton onLoad={() => {}} />
								</motion.div>
							</div>
						)}
					</AnimatePresence>
				</motion.div>
				<MenuToggle toggle={() => toggleOpen()} {...{ isOpen }} />
			</div>
		</>
	);
};

export const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
	<button
		onClick={toggle}
		className="overflow-hidden h-10 rounded-full text-sm font-semibold uppercase tracking-wider z-[99] select-none"
	>
		<motion.p
			animate={{ translateY: isOpen ? "-100%" : "0%" }}
			transition={{ type: "tween" }}
			className="h-full flex items-center justify-center px-4 bg-theme-purple dark:bg-slate-100 text-white dark:text-slate-900"
		>
			Menu
		</motion.p>
		<motion.p
			animate={{
				translateY: isOpen ? "-100%" : "0%",
				rotateX: !isOpen ? 70 : 0,
				top: !isOpen ? "-50%" : "0%",
			}}
			transition={{ type: "tween" }}
			className="h-full flex items-center justify-center px-4 bg-white dark:bg-slate-900 text-theme-purple dark:text-slate-200"
		>
			Close
		</motion.p>
	</button>
);

export default Navbar;
