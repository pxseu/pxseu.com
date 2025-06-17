"use client";

import { useRealtime } from "@/contexts/RealtimeContext";
import { useRef, useEffect, useCallback } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Playing() {
	const { data, isConnected } = useRealtime();
	const ref = useRef<HTMLDivElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number>(null);

	const animateProgress = useCallback(() => {
		if (!data?.playing || !progressBarRef.current) return;

		const start = new Date(data.playing.progress.start).getTime();
		const end = new Date(data.playing.progress.end).getTime();
		const now = new Date().getTime();
		const currentProgress = ((now - start) / (end - start)) * 100;
		const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);

		// Direct DOM update - no React re-render!
		progressBarRef.current.style.width = `${clampedProgress}%`;

		// Continue animation if song is still playing
		if (clampedProgress < 100) {
			animationFrameRef.current = requestAnimationFrame(animateProgress);
		}
	}, [data?.playing]);

	useEffect(() => {
		if (!isConnected || !data?.playing) {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			return;
		}

		// Start the animation loop
		animateProgress();

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isConnected, data?.playing, animateProgress]);

	return (
		<>
			{isConnected && data?.playing && (
				<div
					ref={ref}
					className="group fixed bottom-4 left-4 bg-zinc-900/40 backdrop-blur-md text-sm text-white p-3 rounded-xl shadow-lg z-50 w-[104px] hover:w-[400px] transition-[width] duration-300 ease-in-out hover:max-w- full"
				>
					<div className="flex items-start gap-4 px-2 overflow-hidden">
						<img
							src={data.playing.album.image}
							alt={data.playing.album.name}
							className="rounded-md shrink-0 aspect-square"
							width={64}
							height={64}
						/>

						<div className="w-0 group-hover:w-[400px] flex-1 min-w-0 transition-[width] duration-300 ease-in-out">
							<div className="flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<a
									href={data.playing.song.url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold truncate text-base hover:underline"
								>
									{data.playing.song.title}
								</a>
								<span className="text-zinc-300 truncate">
									{data.playing.song.artists}
								</span>
								<a
									href={data.playing.album.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-zinc-300 truncate hover:underline"
								>
									{data.playing.album.name}
								</a>
							</div>
						</div>
					</div>
					<div className="h-1 bg-zinc-700 rounded-full mt-3 w-full transition-all duration-300">
						<div
							ref={progressBarRef}
							className="h-full bg-white rounded-full transition-[width] duration-75 ease-linear"
							style={{
								width: "0%",
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
}
