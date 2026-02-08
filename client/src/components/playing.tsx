"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRealtime } from "@/contexts/RealtimeContext";

export default function Playing() {
	const { data, isConnected } = useRealtime();
	const [isExpanded, setIsExpanded] = useState(false);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number | null>(null);
	const collapseTimeoutRef = useRef<number | null>(null);

	const animateProgress = useCallback(() => {
		if (!progressBarRef.current) return;
		if (!data?.playing) return;

		const start = new Date(data.playing.progress.start).getTime();
		const end = new Date(data.playing.progress.end).getTime();
		const now = Date.now();
		const currentProgress = ((now - start) / (end - start)) * 100;
		const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);

		progressBarRef.current.style.width = `${clampedProgress}%`;

		if (clampedProgress < 100) {
			animationFrameRef.current = requestAnimationFrame(animateProgress);
		}
	}, [data?.playing]);

	useEffect(() => {
		if (!isConnected || !data?.playing) {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (collapseTimeoutRef.current) {
				clearTimeout(collapseTimeoutRef.current);
				collapseTimeoutRef.current = null;
			}

			if (progressBarRef.current) {
				progressBarRef.current.style.width = "0%";
			}
			setIsExpanded(false);
			return;
		}

		animateProgress();

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (collapseTimeoutRef.current) {
				clearTimeout(collapseTimeoutRef.current);
				collapseTimeoutRef.current = null;
			}
		};
	}, [isConnected, data?.playing, animateProgress]);

	const handleExpand = () => {
		if (collapseTimeoutRef.current) {
			clearTimeout(collapseTimeoutRef.current);
			collapseTimeoutRef.current = null;
		}
		setIsExpanded(true);
	};

	const handleCollapse = () => {
		if (collapseTimeoutRef.current) {
			clearTimeout(collapseTimeoutRef.current);
		}

		// Small close delay makes hover feel less twitchy when pointer skims edges.
		collapseTimeoutRef.current = window.setTimeout(() => {
			setIsExpanded(false);
		}, 120);
	};

	if (!isConnected || !data?.playing) return null;

	return (
		<div
			className="fixed right-2 bottom-2 z-50 w-[min(23rem,calc(100vw-0.75rem))] p-2"
			onPointerEnter={handleExpand}
			onPointerLeave={handleCollapse}
			onFocusCapture={handleExpand}
			onBlurCapture={handleCollapse}
		>
			<div
				className={`ml-auto overflow-hidden border border-border-100 bg-zinc-950/80 p-2 text-sm text-zinc-200 transition-[width,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
					isExpanded
						? "w-full shadow-[0_0_0_1px_rgba(128,102,247,0.15)]"
						: "w-23"
				}`}
			>
				<div className="flex items-start gap-3 overflow-hidden px-1">
					{/* biome-ignore lint/performance/noImgElement: this is a static site, no need for next/image */}
					<img
						src={data.playing.album.image || "/assets/placeholder/album.png"}
						alt={data.playing.album.name}
						className={`aspect-square shrink-0 border border-border-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
							isExpanded ? "scale-100" : "scale-95"
						}`}
						width={64}
						height={64}
					/>

					<div
						className={`min-w-0 flex-1 transition-[max-width,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
							isExpanded
								? "max-w-70 translate-x-0 opacity-100"
								: "max-w-0 -translate-x-1 opacity-0"
						}`}
					>
						<div className="flex flex-col justify-between">
							<a
								href={data.playing.song.url}
								target="_blank"
								rel="noopener noreferrer"
								className="truncate text-sm font-semibold uppercase tracking-[0.05em] hover:underline"
								title={data.playing.song.title}
							>
								{data.playing.song.title}
							</a>
							<span
								className="truncate text-xs uppercase tracking-[0.08em] text-zinc-400"
								title={data.playing.song.artists}
							>
								{data.playing.song.artists}
							</span>
							<a
								href={data.playing.album.url}
								target="_blank"
								rel="noopener noreferrer"
								className="truncate text-xs text-zinc-500 hover:underline"
								title={data.playing.album.name}
							>
								{data.playing.album.name}
							</a>
						</div>
					</div>
				</div>
				<div className="mt-2 h-1 w-full bg-zinc-900 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
					<div
						ref={progressBarRef}
						className="h-full bg-zinc-300 transition-[width] duration-75 ease-linear"
						style={{
							width: "0%",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
