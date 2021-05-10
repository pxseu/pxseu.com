import Head from "next/head";
import React, { memo, ReactNode, useEffect, useState } from "react";
import Modal from "./Modal";

const BackgroundLoader = (props: { children: ReactNode }) => {
	const [darling, setDarling] = useState(false);
	const [isActive, setIsActive] = useState(true);
	let titlePosition = 0,
		darlingCodePosition = 0;

	const TitleTextActive = [
			"I",
			"I l",
			"I lo",
			"I lov",
			"I love",
			"I love y",
			"I love yo",
			"I love you",
			"I love you <",
			"I love you <3",
			"(⁄˘⁄ ⁄ ω⁄ ⁄ ˘⁄)",
		],
		TitleTextInactive = [
			"Please come back :(((",
			"I miss youuuu",
			"I can give you cookies!!",
			"Hey, how are things?",
			"I really was looking forward to talking with you...",
			"Mind coming around for a while?",
			"What's up?",
		],
		DarlingCode = "uwu";

	const loopActive = () => {
		const titleEl = document.getElementsByTagName("title")[0];
		if (titleEl) {
			titleEl.innerHTML = TitleTextActive[titlePosition++ % TitleTextActive.length];
		}
	};

	const loopInactive = () => {
		const titleEl = document.getElementsByTagName("title")[0];
		if (titleEl) {
			titleEl.innerHTML = TitleTextInactive[Math.floor(Math.random() * TitleTextInactive.length)];
		}
	};
	const darlingCodeChecker = (event: KeyboardEvent) => {
		const inputs = ["input", "select", "button", "textarea"];
		const aEl = document.activeElement;
		if (aEl && inputs.indexOf(aEl.tagName.toLowerCase()) !== -1) return;

		const key = event.key.toLowerCase();
		const requiredKey = DarlingCode[darlingCodePosition].toLowerCase();
		if (key != requiredKey) {
			darlingCodePosition = 0;
			return;
		}

		darlingCodePosition++;
		if (darlingCodePosition != DarlingCode.length) return;

		setDarling(true);
		darlingCodePosition = 0;
	};

	const tabChanged = () => {
		setIsActive((curAct) => !curAct);
	};

	useEffect(() => {
		const nameLoop = setInterval(isActive ? loopActive : loopInactive, isActive ? 800 : 2000);
		document.addEventListener("keydown", darlingCodeChecker);
		document.addEventListener("visibilitychange", tabChanged);

		return () => {
			document.removeEventListener("keydown", darlingCodeChecker);
			document.removeEventListener("visibilitychange", tabChanged);
			clearInterval(nameLoop);
		};
	}, [isActive]);

	return (
		<>
			<Head>
				{/* Main Meta */}
				<meta charSet="UTF-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta name="description" content="Pxseu's website!" />
				<meta name="keywords" content="pxseu, poseuxck" />
				<meta name="author" content="pxseu" />
				<meta name="robots" content="index, follow" />
				<link rel="manifest" href="/manifest.json?v=1.1" />
				<meta name="apple-mobile-web-app-title" content="pxseu" />
				<meta name="application-name" content="pxseu" />
				{/* End Main Meta */}

				{/* Icons */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.1" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.1" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.1" />
				<link rel="shortcut icon" href="/favicon.ico?v=1.1" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.1" color="#f52e77" />
				{/* End Icons */}

				{/* Colors */}
				<meta name="msapplication-TileColor" content="#f52e77" />
				<meta name="theme-color" content="#f52e77" />
				{/* End Colors */}

				{/* Open Graph */}
				<meta property="og:url" content="https://www.pxseu.com" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content="pxseu.com" />
				<meta property="og:title" content="pxseu.com" />
				<meta property="og:image" content="https://www.pxseu.com/android-chrome-512x512.png?v=4" />
				{/* End Open Graph */}

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@pxseu" />
				<meta name="twitter:title" content="pxseu.com" />
				<meta name="twitter:description" content="Pxseu's website!" />
				<meta name="twitter:image" content="https://www.pxseu.com/android-chrome-512x512.png?v=4" />
				{/* End Twitter */}

				{/* Misc */}
				<meta name="viewport" content="width=device-width, initial-scale=0.8" />
				<meta name="google-site-verification" content="azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk" />
				{/* End Misc */}
			</Head>
			{props.children}

			<Modal open={darling} onClose={() => setDarling(false)}>
				I love you Darling!
			</Modal>
		</>
	);
};

export default memo(BackgroundLoader);
