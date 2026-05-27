"use client";

import Link from "@/components/ui/link";
import { RelativeTime } from "@/components/ui/relative-time";
import { Tooltip } from "@/components/ui/tooltip";
import { useRealtime } from "@/contexts/RealtimeContext";

export default function Location() {
	const { data, isConnected } = useRealtime();

	let location = "Unknown";

	if (isConnected && data?.location) {
		location = `${data.location.city}, ${data.location.country}`;
	}

	const mapUrl = `https://maps.apple.com/?q=${encodeURIComponent(location)}`;

	return (
		<p className="text-xs uppercase tracking-[0.12em] text-zinc-400">
			{isConnected ? (
				data?.location ? (
					<>
						{" "}
						Currently in{" "}
						<Tooltip content={<RelativeTime date={data.location.timestamp} />}>
							<Link
								className="text-brand-500 underline decoration-dotted underline-offset-4"
								href={mapUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								{location}
							</Link>
						</Tooltip>
					</>
				) : (
					<span>Unknown location</span>
				)
			) : (
				<span>Triangulating…</span>
			)}
		</p>
	);
}
