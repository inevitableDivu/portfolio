"use client";

import { useEffect, useState } from "react";

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = () => {
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const resize = () => {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener("resize", throttle(resize, 200));
		resize();

		return () => window.removeEventListener("resize", resize);
	}, []);

	return dimensions;
};

function throttle<T extends Function>(func: T, delay: number) {
	let lastCall = 0;
	return function (this: any, ...args: any[]) {
		const now = Date.now();
		if (now - lastCall >= delay) {
			lastCall = now;
			func.apply(this, args);
		}
	};
}
