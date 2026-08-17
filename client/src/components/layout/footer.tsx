"use client";

import type { Location } from "@pxseu/shared";
import { useState } from "react";
import { useRealtime } from "@/contexts/RealtimeContext";

function resolveLocation(location: Partial<Location> | null | undefined) {
	if (location === undefined) return "Unknown";
	if (location === null) return "Unavailable";

	const { city, country } = location;

	if (city && country) return `${city}, ${country}`;

	return city ?? country ?? "Unknown";
}

function TransitioningText({ text }: { text: string }) {
	const [rendered, setRendered] = useState<{
		current: string;
		previous: string | null;
	}>(() => ({ current: text, previous: null }));

	if (rendered.current !== text) {
		setRendered({ current: text, previous: rendered.current });
	}

	const isTransitioning = rendered.previous !== null;

	return (
		<span aria-atomic="true" aria-live="polite" data-location-text>
			{rendered.previous ? (
				<span aria-hidden="true" data-location-out>
					{rendered.previous}
				</span>
			) : null}
			<span
				data-location-in={isTransitioning ? "" : undefined}
				onAnimationEnd={() => {
					setRendered((latest) =>
						latest.current === rendered.current ? { ...latest, previous: null } : latest,
					);
				}}
			>
				{rendered.current}
			</span>
		</span>
	);
}

export default function Footer() {
	const { data } = useRealtime();
	const location = resolveLocation(data?.location);

	return (
		<footer
			className="flex flex-col gap-2 border-t border-zinc-800 pt-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between"
			data-stagger
		>
			<p>
				Currently in <TransitioningText text={location} />
			</p>
			<p className="whitespace-nowrap">&copy; 2019&ndash;{new Date().getFullYear()}</p>
		</footer>
	);
}
