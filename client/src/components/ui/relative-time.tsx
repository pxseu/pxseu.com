import { useRelative } from "@/hooks/useRelative";

interface RelativeTimeProps {
	date: Date | string | number;
}

export function RelativeTime({ date }: RelativeTimeProps) {
	const relative = useRelative(date);

	return relative;
}
