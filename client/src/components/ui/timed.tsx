"use client";

import { useTimePassed } from "@/hooks/useTimePassed";
import { Tooltip } from "./tooltip";

interface TimedProps {
	timestamp: number;
	label?: string;
	suffix?: string;
}

export function Timed({ timestamp, label, suffix }: TimedProps) {
	const time = useTimePassed(timestamp);

	return (
		<Tooltip content={time.toPrecision(20)} suffix={suffix}>
			{Math.floor(time)} {label}
		</Tooltip>
	);
}
