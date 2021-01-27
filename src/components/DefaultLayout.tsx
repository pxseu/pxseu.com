import React, { memo, ReactNode } from "react";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";
import styles from "../styles/components/DefaultLayout.module.css";

type DefaultLayoutInput = {
	children: ReactNode;
	title: string;
	titleOnClick?: () => void | Promise<void>;
};

const DefaultLayout = ({ title, children, titleOnClick }: DefaultLayoutInput) => (
	<>
		<Head>
			<title>{title}</title>
			<meta
				data-n-head="ssr"
				data-hid="og:description"
				property="og:description"
				content={title}
			/>
		</Head>
		<BackgroundLoader>
			<Navbar />
			<div className={`noselect ${styles.app}`}>
				<h1 className="center">
					<a
						className={titleOnClick ? "link" : ""}
						onClick={() => {
							if (titleOnClick) titleOnClick();
						}}>
						{title}
					</a>
				</h1>
				<hr />
				<main className="center">{children}</main>
				<div className={styles.bottomPadding}></div>
			</div>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayout);
