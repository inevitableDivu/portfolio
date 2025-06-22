"use client";

import React from "react";

import { useDimensions } from "@/hooks";
import { curveFunc, text, translate } from "@/lib/animate";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { navigation } from "./navbar";

const anim = (variants: Variants) => {
	return {
		variants,
		initial: "initial",
		animate: "enter",
		exit: "exit",
	};
};

const CURVE_INDEX = 300;

function getRouteName(route: string) {
	return (
		Object.values(navigation).filter((nav) => {
			const href = nav.mapRouteTo ?? nav.href;
			if (route === href) return true;
			return false;
		})[0].name ?? "Home"
	);
}

function getSvgPath(width: number, height: number) {
	const curve = width > 768 ? CURVE_INDEX : 150;
	const initialPath = `
			M0 ${curve}
			Q${width / 2} 0 ${width} ${curve}
			L${width} ${height + curve}
			Q${width / 2} ${height + curve * 2} 0 ${height + curve}
			L0 0
		`;

	const targetPath = `
			M0 ${curve}
			Q${width / 2} 0 ${width} ${curve}
			L${width} ${height}
			Q${width / 2} ${height} 0 ${height}
			L0 0
		`;

	return { initialPath, targetPath };
}

function Wrapper({ children }: React.PropsWithChildren) {
	const { height, width } = useDimensions();
	const router = useRouter();

	const paths = getSvgPath(width, height);

	return (
		<div className="flex-1 max-w-2xl sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-none mx-auto my-12 md:my-0 flex flex-col z-20 pb-20 sm:pb-0 text-center">
			<motion.p
				className="fixed inset-0 text-white flex items-center justify-center z-[999999] text-xl lg:text-3xl font-semibold"
				{...anim(text)}
			>
				<span className="mx-auto my-auto">{getRouteName(router.route)}</span>
			</motion.p>
			{width < 1 && (
				<motion.div
					id="curve_overlay"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed bg-slate-900 inset-0 z-[999999]"
				/>
			)}
			{width > 0 && (
				<motion.svg
					{...anim(translate(width > 768 ? CURVE_INDEX : 150))}
					className="fixed left-0 w-screen pointer-events-none z-[999997] text-slate-900"
					style={{
						height: `calc(100vh + ${(width > 768 ? CURVE_INDEX : 150) * 2}px)`,
						top: width > 768 ? -CURVE_INDEX : -150,
					}}
				>
					<motion.path
						id="curve_svg"
						{...anim(curveFunc(paths.initialPath, paths.targetPath))}
						fill="currentColor"
					/>
				</motion.svg>
			)}
			{children}
		</div>
	);
}

export default Wrapper;
