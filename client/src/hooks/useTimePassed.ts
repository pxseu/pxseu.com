"use client";

import { usePolledValue } from "./usePolledValue";

const getYearsPassed = (timestamp: number): number =>
	(Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24 * 365.25);

export const useTimePassed = (timestamp: number, intervalMs = 60_000) =>
	usePolledValue(() => getYearsPassed(timestamp), intervalMs);
