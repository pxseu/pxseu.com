import React, { memo, ReactNode } from "react";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";
import styles from "../styles/components/DefaultLayout.module.css";
import Footer from "./Footer";

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
