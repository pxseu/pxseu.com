import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import "dayjs/locale/en-gb";

dayjs.extend(relativeTime);
dayjs.locale("en-gb");

function getRelativeTime(targetDate: Date | string | number) {
	const target = dayjs(targetDate);

	if (!target.isValid()) {
		return "Unknown";
	}

	return target.fromNow();
}

export function useRelative(targetDate: Date | string | number) {
	const [relative, setRelative] = useState(() => getRelativeTime(targetDate));

	useEffect(() => {
		const interval = setInterval(() => {
			setRelative(getRelativeTime(targetDate));
		}, 1_000);

		return () => clearInterval(interval);
	}, [targetDate]);

	return relative;
}
