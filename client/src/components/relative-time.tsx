import { useRelative } from "@/hooks/useRelative";

export function RelativeTime({ date }: { date: Date | string | number }) {
	const relative = useRelative(date);

	return relative;
}
