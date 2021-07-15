import { useEffect, useState } from "react";

const isDayBirthday = (birthday: Date, now: Date) => {
	if (birthday.getDay() === now.getDay() && birthday.getMonth() === now.getMonth()) return true;
	return false;
};

export const useIsBirthday = (timestamp: number) => {
	const [isBirthday, setIsBirthday] = useState(isDayBirthday(new Date(timestamp), new Date()));

	useEffect(() => {
		const isBirthdayCheck = setInterval(() => {
			setIsBirthday(isDayBirthday(new Date(timestamp), new Date()));
		}, 2e4);

		return () => {
			clearInterval(isBirthdayCheck);
		};
	}, [timestamp]);

	return isBirthday;
};
