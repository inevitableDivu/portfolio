"use client";

import Logo from "@/assets/logo";
import MenuIcon from "@/assets/menu";
import { useDimensions } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CustomLink from "./link";

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
			<div className="relative z-50 flex">
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
							"none invisible": !isOpen,
						}
					)}
					style={{
						transitionDelay: isOpen ? "0s" : "1.2s",
						animationDelay: isOpen ? "0s" : "1.2s",
					}}
				>
					{new Array(4).fill(0).map((_, index) => (
						<motion.div
							key={index}
							animate={{
								translateX: isOpen ? 0 : -window.innerWidth,
							}}
							transition={{
								type: "tween",
								delay: index * 0.15 + (!isOpen ? 0.6 : 0),
							}}
							className="flex-[0.25] bg-slate-900"
						></motion.div>
					))}

					<div className="flex-1 absolute p-5 sm:pt-11 text-white flex flex-col gap-10">
						{Object.values(navigation).map((item, index) => {
							return (
								<motion.span
									key={item.href}
									className="overflow-hidden"
									animate={{
										translateY: isOpen ? 0 : 40,
										opacity: isOpen ? 1 : 0,
									}}
									transition={{
										type: "tween",
										delay: (!isOpen ? 0 : 0.6) + 0.1 * index,
									}}
								>
									<Link
										key={item.href}
										href={item.mapRouteTo || item.href}
										target={item.target}
										passHref
										className="block px-2 py-2 text-3xl font-semibold hover:text-gray-300 transition-colors duration-200"
									>
										{item.name}
									</Link>
								</motion.span>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
