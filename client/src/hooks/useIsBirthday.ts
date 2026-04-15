import { usePolledValue } from "./usePolledValue";

const isDayBirthday = (birthday: Date, now: Date) =>
	birthday.getDate() === now.getDate() &&
	birthday.getMonth() === now.getMonth();

export const useIsBirthday = (timestamp: number) =>
	usePolledValue(
		() => isDayBirthday(new Date(timestamp), new Date()),
		2e4,
	);
