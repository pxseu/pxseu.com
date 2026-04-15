import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en-gb";
import { usePolledValue } from "./usePolledValue";

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
	return usePolledValue(() => getRelativeTime(targetDate), 1_000);
}
