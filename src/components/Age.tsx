/**
 *  Skidded from https://github.com/ottomated/portfolio/blob/master/js/age.js
 */

import React, { useEffect, useState } from "react";
import styles from "./Age.module.css";

type props = {
	timestamp: number;
};

const getDate = (timestamp: number): string => {
	let time = new Date().getTime() - new Date(timestamp).getTime();
	time /= 1000 * 60 * 60 * 24 * 365.25;
	return time.toString().substring(0, 12);
};

const Age = ({ timestamp }: props): JSX.Element => {
	const [age, setAge] = useState("0".repeat(12));

	useEffect(() => {
		const ageChange = setInterval(() => {
			setAge(getDate(timestamp));
		}, 50);
		return () => {
			clearInterval(ageChange);
		};
	}, []);

	return <span className={styles.age}>{age}</span>;
};

export default Age;
