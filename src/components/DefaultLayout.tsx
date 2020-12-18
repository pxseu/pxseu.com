import React, { memo } from "react";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";

type DefaultLayoutInput = {
	children: any;
	title: string;
	titleOnClick?: Function;
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
			<div className="noselect app">
				<h1 className="center">
					<a onClick={() => (titleOnClick == undefined ? void 0 : titleOnClick())}>
						{title}
					</a>
				</h1>
				<hr />
				<main className="center">{children}</main>
				<div className="bottomPadding"></div>
			</div>
			<style jsx>{`
				.app {
					top: 50px;
				}
				.bottomPadding {
					padding: 20px;
				}
			`}</style>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayout);
