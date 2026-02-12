"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";

const PARALLAX_SPEED = 0.2;
const GRID_SIZE = 32;

export default function BackgroundParallax() {
	const layerRef = useRef<HTMLDivElement>(null);
	const reducedMotionRef = useRef(false);

	useEffect(() => {
		reducedMotionRef.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (layerRef.current) {
			layerRef.current.style.display = "block";
		}
	}, []);

	const setOffset = useCallback((offset: number) => {
		const layer = layerRef.current;
		if (!layer) return;
		layer.style.transform = `translate3d(0, ${-offset}px, 0)`;
	}, []);

	useLenis(
		(lenis) => {
			if (reducedMotionRef.current) {
				setOffset(0);
				return;
			}
			const loopedOffset = (lenis.scroll * PARALLAX_SPEED) % GRID_SIZE;
			setOffset(loopedOffset);
		},
		[setOffset],
		1,
	);

	return (
		<div
			aria-hidden
			className={
				"pointer-events-none fixed inset-[-25vh] -z-10 overflow-hidden animate-fade-in"
			}
			style={{ display: "hidden" }}
		>
			<div
				ref={layerRef}
				className="absolute inset-0 opacity-40 will-change-transform bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]"
			/>
		</div>
	);
}
