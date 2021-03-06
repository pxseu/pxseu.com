/**
 *  Skidded from https://github.com/ottomated/portfolio/blob/dc3cc1e7c60df255bc724eb834e181c4af3a97b1/js/age.js
 */

import React, { useEffect, useState } from "react";
import styles from "../styles/components/Age.module.css";

const DATE_LENGTH = 12;
const DEFAULT_VALUE = "0".repeat(DATE_LENGTH);

type AgeProps = {
	timestamp: number;
};

const getDate = (timestamp: number): string => {
	let time = new Date().getTime() - new Date(timestamp).getTime();
	time /= 1000 * 60 * 60 * 24 * 365.25;
	return time.toString().substring(0, DATE_LENGTH);
};

const Age = ({ timestamp }: AgeProps): JSX.Element => {
	const [age, setAge] = useState(DEFAULT_VALUE);

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
