"use client";

import { useTimePassed } from "@/hooks/useTimePassed";
import React, { JSX, useEffect, useRef, useState } from "react";

type TitleProps = {
	timestamp: number;
	label?: string;
};

export function Timed({ timestamp, label }: TitleProps): JSX.Element {
	const [mounted, setMounted] = useState(false);
	const [hovered, setHovered] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);
	const time = useTimePassed(timestamp);

	useEffect(() => {
		setMounted(true);

		const handleMouseEnter = () => setHovered(true);
		const handleMouseLeave = () => setHovered(false);

		const node = ref.current;

		if (node) {
			node.addEventListener("mouseenter", handleMouseEnter);
			node.addEventListener("mouseleave", handleMouseLeave);
		}

		return () => {
			if (node) {
				node.removeEventListener("mouseenter", handleMouseEnter);
				node.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	return (
		<span className="relative inline-block group underline decoration-dotted" ref={ref}>
			{Math.floor(time)} {label}
			{mounted && hovered && (
				<span className="absolute bottom-full left-1/2 -translate-x-1/2 px-3 py-2 bg-zinc-900 text-zinc-300 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-mono">
					{time.toPrecision(20)}
				</span>
			)}
		</span>
	);
}
