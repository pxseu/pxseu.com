"use client";

import { useTimePassed } from "@/hooks/useTimePassed";
import React, { JSX } from "react";

type TitleProps = {
	timestamp: number;
};

export function Timed({ timestamp }: TitleProps): JSX.Element {
	const time = useTimePassed(timestamp);

	return <span>{Math.floor(time)}</span>;
}
