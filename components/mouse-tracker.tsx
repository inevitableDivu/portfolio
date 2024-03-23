"use client";

/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import { useCallback, useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";

/* -------------------------- Internal Dependencies ------------------------- */
import { useIsMounted } from "@/hooks";
import { cn } from "@/lib/utils";

// Define a type for the Event used in mouse events
type MouseEvent = globalThis.MouseEvent;

const Cursor = () => {
	const dot = useRef<HTMLDivElement>(null);
	const dotOutline = useRef<HTMLDivElement>(null);
	const isMounted = useIsMounted();
	const [mouseActive, setMouseActive] = useState(false);

	const delay = 8;
	const _x = useRef(0);
	const _y = useRef(0);
	const endX = useRef(process.browser ? window.innerWidth / 2 : 0);
	const endY = useRef(process.browser ? window.innerHeight / 2 : 0);

	const cursorVisible = useRef(true);
	const cursorEnlarged = useRef(false);

	const requestRef = useRef<number | null>(null);

	const toggleCursorVisibility = useCallback(() => {
		if (dot?.current && dotOutline?.current)
			if (cursorVisible.current) {
				dot.current.style.opacity = "1";
				dotOutline.current.style.opacity = "1";
			} else {
				dot.current.style.opacity = "0";
				dotOutline.current.style.opacity = "0";
			}
	}, []);

	const toggleCursorSize = useCallback(() => {
		if (dot?.current && dotOutline?.current)
			if (cursorEnlarged.current) {
				setMouseActive(true);
			} else {
				setMouseActive(false);
			}
	}, []);

	const mouseOverEvent = useCallback(
		(e: MouseEvent) => {
			if ((e.target as any)?.id === "cardHover") {
				cursorEnlarged.current = true;
				toggleCursorSize();
			}
		},
		[toggleCursorSize]
	);

	const mouseOutEvent = useCallback(
		(e: MouseEvent) => {
			if ((e.target as any)?.id === "cardHover") {
				cursorEnlarged.current = false;
				toggleCursorSize();
			}
		},
		[toggleCursorSize]
	);

	const mouseEnterEvent = useCallback(() => {
		cursorEnlarged.current = true;
		toggleCursorVisibility();
	}, [toggleCursorVisibility]);

	const mouseLeaveEvent = useCallback(() => {
		cursorEnlarged.current = false;
		toggleCursorVisibility();
	}, [toggleCursorVisibility]);

	const mouseMoveEvent = useCallback(
		(e: MouseEvent) => {
			cursorVisible.current = true;
			toggleCursorVisibility();

			endX.current = e.pageX;
			endY.current = e.pageY;
			if (dot?.current) {
				dot.current.style.top = endY.current + "px";
				dot.current.style.left = endX.current + "px";
			}
		},
		[toggleCursorVisibility]
	);

	const animateDotOutline = useCallback(() => {
		_x.current += (endX.current - _x.current) / delay;
		_y.current += (endY.current - _y.current) / delay;

		if (dotOutline?.current) {
			dotOutline.current.style.top = _y.current + "px";
			dotOutline.current.style.left = _x.current + "px";
		}

		requestRef.current = requestAnimationFrame(animateDotOutline);
	}, [endX, endY]);

	useEffect(() => {
		const requestRefs = requestRef?.current;

		if (isMounted()) {
			document.addEventListener("mousemove", mouseMoveEvent);
			document.addEventListener("mouseenter", mouseEnterEvent);
			document.addEventListener("mouseleave", mouseLeaveEvent);
			document.addEventListener("mouseover", mouseOverEvent);
			document.addEventListener("mouseout", mouseOutEvent);

			animateDotOutline();
		}
		return () => {
			document.removeEventListener("mousemove", mouseMoveEvent);
			document.removeEventListener("mouseenter", mouseEnterEvent);
			document.removeEventListener("mouseleave", mouseLeaveEvent);
			document.removeEventListener("mouseover", mouseOverEvent);
			document.removeEventListener("mouseout", mouseOutEvent);

			cancelAnimationFrame(requestRefs as number);
		};
	}, [
		isMounted,
		mouseMoveEvent,
		mouseEnterEvent,
		mouseLeaveEvent,
		mouseOverEvent,
		mouseOutEvent,
		animateDotOutline,
	]);

	useEffect(() => {
		if (mouseActive && dotOutline.current) {
			dotOutline.current.style.opacity = "0";
		}
	}, [mouseActive, dotOutline]);

	return (
		<>
			<div
				ref={dotOutline}
				className={cn(
					"cursor-dot-outline border border-neutral-400 shadow h-20 aspect-square rounded-full opacity-0 hidden md:block z-[9992] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none absolute transition-[height,opacity] duration-300",
					{
						"h-4 !opacity-0": mouseActive,
					}
				)}
			></div>
			<div
				ref={dot}
				className={cn(
					"cursor-dot bg-gray-400 shadow h-2 aspect-square rounded-full opacity-0 hidden md:block z-[9992] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none absolute border-0 border-white/40 border-spacing-2 p-0 transition-[border,padding] duration-150",
					{
						"border-4 p-1 bg-gray-400/40": mouseActive,
					}
				)}
			></div>
		</>
	);
};

export default Cursor;
