"use client";

import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { styles, user } from "@/constants/data";

export default function BackgroundBoxes({ className, ...rest }: { className?: string }) {
	const rows = useMemo(() => new Array(100).fill(1), []);
	const cols = useMemo(() => new Array(80).fill(1), []);
	let colors = useMemo(
		() =>
			localStorage.theme === "dark"
				? [
						"--sky-400",
						"--pink-400",
						"--green-400",
						"--yellow-400",
						"--red-400",
						"--purple-400",
						"--blue-400",
						"--indigo-400",
						"--violet-400",
				  ]
				: [
						"--sky-300",
						"--pink-300",
						"--green-300",
						"--yellow-300",
						"--red-300",
						"--purple-300",
						"--blue-300",
						"--indigo-300",
						"--violet-300",
				  ],
		[localStorage.theme]
	);

	const getRandomColor = useCallback(() => {
		return colors[Math.floor(Math.random() * colors.length)];
	}, []);

	return (
		<>
			<div className="absolute -z-[2] select-none bottom-0 left-5 text-[12rem] md:text-[16rem] xl:text-[24rem] font-bold text-black/[3%] dark:text-white/[3%] !leading-none">
				<span className="uppercase font-serif">{user.nameInitials}</span>
			</div>
			<div
				style={{
					transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
				}}
				className={cn(
					"absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
					className
				)}
				{...rest}
			>
				{rows.map((_, i) => (
					<motion.div
						key={`row` + i}
						className="w-16 h-8  border-l  border-slate-200 dark:border-slate-800 relative"
					>
						{cols.map((_, j) => (
							<motion.div
								whileHover={{
									backgroundColor: `var(${getRandomColor()})`,
									opacity: 0.5,
									transition: { duration: 0 },
								}}
								animate={{
									transition: { duration: 2 },
								}}
								key={`col` + j}
								className="w-16 h-8  border-r border-t border-slate-200 dark:border-slate-800 relative"
							>
								{j % 2 === 0 && i % 2 === 0 ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-300 dark:text-slate-700 stroke-[1px] pointer-events-none"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v12m6-6H6"
										/>
									</svg>
								) : null}
							</motion.div>
						))}
					</motion.div>
				))}
			</div>
		</>
	);
}
