import Head from "next/head";
import React, { memo, ReactNode } from "react";
import styles from "../styles/components/DefaultLayout.module.css";
import BackgroundLoader from "./BackgroundLoader";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface DefaultLayoutInput {
	children: ReactNode;
	title?: string;
}

const DefaultLayout = ({ title, children }: DefaultLayoutInput) => (
	<>
		<Head>
			<title>{title}</title>
			<meta data-n-head="ssr" data-hid="og:description" property="og:description" content={title} />
		</Head>
		<BackgroundLoader>
			<div className={styles.pageWrapper}>
				<Navbar />
				<main className={[styles.app].join(" ")}>{children}</main>
				<Footer />
			</div>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayout);
