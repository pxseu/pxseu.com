"use client";

import { useRealtime } from "@/contexts/RealtimeContext";
import { useRef, useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Playing() {
	const { data, isConnected } = useRealtime();
	const ref = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!isConnected || !data?.playing) return;

		const updateProgress = () => {
			const start = new Date(data.playing.progress.start).getTime();
			const end = new Date(data.playing.progress.end).getTime();
			const now = new Date().getTime();
			const newProgress = ((now - start) / (end - start)) * 100;
			setProgress(Math.min(Math.max(newProgress, 0), 100));
		};

		// Update immediately
		updateProgress();

		// Then update every second
		const interval = setInterval(updateProgress, 10);

		return () => clearInterval(interval);
	}, [isConnected, data?.playing]);

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
								<span className="text-zinc-300 truncate">{data.playing.song.artists}</span>
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
							className="h-full bg-white rounded-full"
							style={{
								width: `${progress}%`,
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
}
