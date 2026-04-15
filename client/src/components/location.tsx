"use client";

import { useRealtime } from "@/contexts/RealtimeContext";
import { RelativeTime } from "./relative-time";
import { Tooltip } from "./tooltip";

export default function Location() {
	const { data, isConnected } = useRealtime();

	let location = "Unknown";

	if (isConnected && data?.location) {
		location = `${data.location.city}, ${data.location.country}`;
	}

	const hasLocation = isConnected && data?.location;
	const locationStatus = isConnected
		? "Location unavailable"
		: "Location offline";
	const mapUrl = `https://maps.apple.com/?q=${encodeURIComponent(location)}`;

	return (
		<div className="min-h-6">
			<p className="mt-2 text-xs uppercase tracking-[0.12em] text-zinc-400 transition-all duration-500 ease-out opacity-100 translate-y-0">
				Currently in{" "}
				{hasLocation ? (
					<Tooltip content={<RelativeTime date={data.location.timestamp} />}>
						<a
							className="text-brand-500 underline decoration-dotted underline-offset-4"
							href={mapUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{location}
						</a>
					</Tooltip>
				) : (
					<span>{locationStatus}</span>
				)}
			</p>
		</div>
	);
}
