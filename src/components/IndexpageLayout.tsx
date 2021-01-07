import React, { ReactNode } from "react";
import Head from "next/head";
import BackgroundLoader from "../components/BackgroundLoader";
import styles from "../styles/IndexpageLayout.module.css";

interface props {
	children: ReactNode;
}

const IndexpageLayout = ({ children }: props): JSX.Element => {
	return (
		<>
			<Head>
				<title>pxseu</title>
				<meta
					data-n-head="ssr"
					data-hid="og:description"
					property="og:description"
					content="Home sweet homepage."
				/>
			</Head>
			<BackgroundLoader>
				<div className={styles.app}>{children}</div>
			</BackgroundLoader>
		</>
	);
};

export default IndexpageLayout;
