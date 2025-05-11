"use client";

import { useRealtime } from "@/contexts/RealtimeContext";

export default function Location() {
	const { data, isConnected } = useRealtime();

	let location = "Unknown";

	if (isConnected && data?.location) {
		location = `${data.location.city}, ${data.location.country}`;
	}

	return (
		<div className="min-h-[1.5rem]">
			<p
				className={`mt-2 text-sm text-muted-foreground transition-all duration-500 ease-out ${
					isConnected && data?.location ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
				}`}
			>
				Currently in {location}
			</p>
		</div>
	);
}
