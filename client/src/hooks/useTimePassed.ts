"use client";

import { useEffect, useState } from "react";

const getYearsPassed = (timestamp: number): number =>
	(Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24 * 365.25);

export const useTimePassed = (timestamp: number) => {
	const [age, setAge] = useState(getYearsPassed(timestamp));

	useEffect(() => {
		const ageChange = setInterval(() => {
			setAge(getYearsPassed(timestamp));
		}, 50);

		return () => {
			clearInterval(ageChange);
		};
	}, [timestamp]);

	return age;
};
