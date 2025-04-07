import { useEffect, useState } from "react";

const getDate = (timestamp: number): number => {
	let time = new Date().getTime() - new Date(timestamp).getTime();
	time /= 1000 * 60 * 60 * 24 * 365.25;

	return time;
};

export const useTimePassed = (timestamp: number) => {
	const [age, setAge] = useState(getDate(timestamp));

	useEffect(() => {
		const ageChange = setInterval(() => {
			setAge(getDate(timestamp));
		}, 50);

		return () => {
			clearInterval(ageChange);
		};
	}, [timestamp]);

	return age;
};
