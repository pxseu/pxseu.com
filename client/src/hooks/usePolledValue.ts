import { useEffect, useRef, useState } from "react";

/**
 * Polls a value by calling `computeFn` immediately and then every
 * `intervalMs` milliseconds. The latest `computeFn` is always used via a
 * ref, so callers don't need to memoize it.
 */
export function usePolledValue<T>(computeFn: () => T, intervalMs: number): T {
	const [value, setValue] = useState(computeFn);
	const fnRef = useRef(computeFn);
	fnRef.current = computeFn;

	useEffect(() => {
		const id = setInterval(() => setValue(fnRef.current()), intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);

	return value;
}
