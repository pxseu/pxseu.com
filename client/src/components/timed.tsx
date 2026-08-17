"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTimePassed } from "@/hooks/useTimePassed";
import { Tooltip } from "./tooltip";

interface TimedProps {
	label: string;
	prefix?: string;
	timestamp: number;
}

function PreciseTimePassed({ timestamp }: Pick<TimedProps, "timestamp">) {
	const prefersReducedMotion = usePrefersReducedMotion();
	const time = useTimePassed(timestamp, prefersReducedMotion ? 60_000 : 50);

	return <span className="select-all">{time.toPrecision(20)}</span>;
}

export function Timed({ timestamp, prefix, label }: TimedProps) {
	const time = useTimePassed(timestamp);

	return (
		<Tooltip content={<PreciseTimePassed timestamp={timestamp} />}>
			{prefix}
			{Math.floor(time)} {label}
		</Tooltip>
	);
}
