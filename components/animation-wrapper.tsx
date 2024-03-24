import React, { useEffect, useMemo, useState } from "react";

import { Variants, motion } from "framer-motion";
import { curve, text, translate } from "@/lib/animate";
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

function Wrapper({ children }: React.PropsWithChildren) {
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	const router = useRouter();

	useEffect(() => {
		const resize = () => {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};

		window.addEventListener("resize", resize);
		resize();

		return () => window.removeEventListener("resize", resize);
	}, []);

	const paths = useMemo(() => {
		const { height, width } = dimensions;
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
	}, [dimensions.height, dimensions.width]);

	return (
		<motion.div
			className="max-w-2xl sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto my-12 md:my-0 flex flex-col z-20 pb-20 sm:pb-0"
			onTransitionEnd={() => {
				console.log("ended");
			}}
		>
			<motion.p
				className="fixed inset-0 text-white flex items-center justify-center z-[999999] text-xl lg:text-3xl font-semibold"
				{...anim(text)}
			>
				<span className="mx-auto my-auto">
					{navigation[router.route as keyof typeof navigation].name}
				</span>
			</motion.p>
			{dimensions.width < 1 && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed bg-slate-900 inset-0 z-[999999]"
				/>
			)}
			{dimensions.width > 0 && (
				<motion.svg
					{...anim(translate(dimensions.width > 768 ? CURVE_INDEX : 150))}
					className="fixed left-0 w-screen pointer-events-none z-[99999] text-slate-900"
					style={{
						height: `calc(100vh + ${
							(dimensions.width > 768 ? CURVE_INDEX : 150) * 2
						}px)`,
						top: dimensions.width > 768 ? -CURVE_INDEX : -150,
					}}
				>
					<motion.path
						{...anim(curve(paths.initialPath, paths.targetPath))}
						// d={paths.initialPath}
						fill="currentColor"
					/>
				</motion.svg>
			)}

			{children}
		</motion.div>
	);
}

export default Wrapper;
