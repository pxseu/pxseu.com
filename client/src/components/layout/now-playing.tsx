"use client";

import { useRealtime } from "@/contexts/RealtimeContext";
import { cn } from "@/utils/cn";

interface MaybeUrlProps {
	href?: string;
	title?: string;
	className?: string;
}

function MaybeUrl({ href, title, className }: MaybeUrlProps) {
	const Node = href ? "a" : "span";

	return (
		<Node
			href={href}
			target={href ? "_blank" : undefined}
			rel={href ? "noopener noreferrer" : undefined}
			className={cn(className, {
				"hover:underline": !!href,
			})}
			title={title}
		>
			{title}
		</Node>
	);
}

function formatMaybeString(
	connected: boolean,
	value: string | undefined,
	fallback: string,
) {
	if (!connected) {
		return "Tuning…";
	}

	return value ?? fallback;
}

export default function Playing() {
	const { data, isConnected } = useRealtime();

	return (
		<div className="flex flex-row gap-3">
			{/*biome-ignore lint/performance/noImgElement: dynamic spotify content */}
			<img
				src={data?.playing?.album.image || "/assets/placeholder/album.png"}
				alt={data?.playing?.album.name ?? "Album cover"}
				className="aspect-square shrink-0 border border-border-100"
				width={48}
				height={48}
			/>
			<div className="flex flex-col justify-between text-zinc-400 text-xs uppercase overflow-hidden">
				<MaybeUrl
					href={data?.playing?.song.url}
					title={formatMaybeString(
						isConnected,
						data?.playing?.song.title,
						"Nothing playing",
					)}
					className="truncate font-semibold"
				/>

				<span
					className="truncate text-zinc-350"
					title={data?.playing?.song.artists}
				>
					{formatMaybeString(
						isConnected,
						data?.playing?.song.artists,
						"No artist",
					)}
				</span>

				<MaybeUrl
					href={data?.playing?.album.url}
					title={formatMaybeString(
						isConnected,
						data?.playing?.album.name,
						"No album",
					)}
					className="truncate"
				/>
			</div>
		</div>
	);
}
