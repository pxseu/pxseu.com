/**
 *  Skidded from https://github.com/ottomated/portfolio/blob/master/js/age.js
 */

import { useEffect, useState } from "react";
import styles from "./Age.module.css";

type props = {
	timestamp: number;
};

const getDate = (timestamp: number): string => {
	let time = new Date().getTime() - new Date(timestamp).getTime();
	time /= 1000 * 60 * 60 * 24 * 365.25;
	return time.toString().substring(0, 12);
};

const Age = ({ timestamp }: props) => {
	const [age, setAge] = useState(getDate(timestamp));

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
