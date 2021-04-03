import React from "react";
import styles from "../styles/components/Footer.module.css";

const Footer = (): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<p className="center">&copy; pxseu 2021</p>
		</footer>
	);
};

export default Footer;
