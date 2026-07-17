"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTimePassed } from "@/hooks/useTimePassed";
import { Tooltip } from "./tooltip";

interface TimedProps {
	timestamp: number;
	label?: string;
	suffix?: string;
}

function PreciseTimePassed({ timestamp }: { timestamp: number }) {
	const prefersReducedMotion = usePrefersReducedMotion();
	const time = useTimePassed(timestamp, prefersReducedMotion ? 60_000 : 50);
	return <>{time.toPrecision(20)}</>;
}

export function Timed({ timestamp, label, suffix }: TimedProps) {
	const time = useTimePassed(timestamp);

	return (
		<Tooltip content={<PreciseTimePassed timestamp={timestamp} />} suffix={suffix} focus>
			{Math.floor(time)} {label}
		</Tooltip>
	);
}
