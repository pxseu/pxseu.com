"use client";

import { useTimePassed } from "@/hooks/useTimePassed";
import { Tooltip } from "./tooltip";

export function Timed({
	timestamp,
	label,
	suffix,
}: {
	timestamp: number;
	label?: string;
	suffix?: string;
}) {
	const time = useTimePassed(timestamp);

	return (
		<Tooltip content={time.toPrecision(20)} suffix={suffix}>
			{Math.floor(time)} {label}
		</Tooltip>
	);
}
