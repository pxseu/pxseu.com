import React, { memo, ReactNode } from "react";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";
import style from "./DefaultLayout.module.css";

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
			<div className={`noselect ${style.app}`}>
				<h1 className="center">
					<a onClick={() => (titleOnClick == undefined ? void 0 : titleOnClick())}>
						{title}
					</a>
				</h1>
				<hr />
				<main className="center">{children}</main>
				<div className={style.bottomPadding}></div>
			</div>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayout);
