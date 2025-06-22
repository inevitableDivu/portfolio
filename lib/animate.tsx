export const text = {
	initial: {
		opacity: 1,
	},

	enter: {
		opacity: 0,
		top: -100,
		transition: {
			duration: 0.45,
			delay: 0.35,
			ease: [0.76, 0, 0.24, 1],
		},
		transitionEnd: { top: "100%" },
	},

	exit: {
		opacity: 1,
		top: 0,
		transition: {
			duration: 0.5,
			delay: 0.4,
			ease: [0.33, 1, 0.68, 1],
		},
	},
};

export const curveFunc = (initialPath: string, targetPath: string) => {
	return {
		initial: {
			d: initialPath,
		},
		enter: {
			d: targetPath,
			transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
		},
	};
};

export const translate = (width: number) => ({
	initial: {
		top: `-${width}px`,
	},
	enter: {
		top: "-100vh",
		transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
		transitionEnd: {
			top: "100vh",
		},
	},
	exit: {
		top: `-${width}px`,
		transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
	},
});
