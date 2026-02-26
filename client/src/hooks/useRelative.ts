import { useEffect, useState } from "react";
import "temporal-polyfill/global";

const rtf = new Intl.RelativeTimeFormat("en", {
	numeric: "auto",
	style: "long",
});

function getRelativeTime(targetDate: Date | string | number) {
	const targetInstant =
		targetDate instanceof Date
			? Temporal.Instant.from(targetDate.toISOString())
			: typeof targetDate === "number"
				? Temporal.Instant.fromEpochMilliseconds(targetDate)
				: Temporal.Instant.from(new Date(targetDate).toISOString());

	const nowZdt = Temporal.Now.instant().toZonedDateTimeISO("UTC");
	const targetZdt = targetInstant.toZonedDateTimeISO("UTC");

	const diff = targetZdt.since(nowZdt, {
		largestUnit: "year",
		smallestUnit: "second",
	});

	if (diff.years) return rtf.format(diff.years, "year");
	if (diff.months) return rtf.format(diff.months, "month");
	if (diff.weeks) return rtf.format(diff.weeks, "week");
	if (diff.days) return rtf.format(diff.days, "day");
	if (diff.hours) return rtf.format(diff.hours, "hour");
	if (diff.minutes) return rtf.format(diff.minutes, "minute");
	return rtf.format(diff.seconds, "second");
}

export function useRelative(targetDate: Date | string | number) {
	const [relative, setRelative] = useState(() => getRelativeTime(targetDate));

	useEffect(() => {
		const interval = setInterval(() => {
			setRelative(getRelativeTime(targetDate));
		}, 100);

		return () => clearInterval(interval);
	}, [targetDate]);

	return relative;
}
