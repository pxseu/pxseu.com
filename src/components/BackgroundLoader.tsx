import React, { memo, ReactNode } from "react";
import Head from "next/head";
import Particles from "react-particles-js";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "../styles/components/BackgroundLoader.module.css";

const particlesSwitchName = "particlesSwitch";

const PlatformParticles = (props: { on: boolean }) => {
	if (!props.on) return null;

	let particlesConfig;
	if (isMobile) {
		particlesConfig = require("../../particlesjs-config.mobile.json");
	} else {
		particlesConfig = require("../../particlesjs-config.json");
	}

	return <Particles className="particles-js" params={particlesConfig} />;
};

const BackgroundLoader = (props: { children: ReactNode }) => {
	const [particlesSwitch, setParticlesSwitch] = useState(true);
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
		DarlingCode = ["u", "w", "u"];

	const loopActive = () => {
		const titleEl = document.getElementsByTagName("title")[0];
		if (titleEl) {
			titleEl.innerHTML = TitleTextActive[titlePosition++ % TitleTextActive.length];
		}
	};

	const loopInactive = () => {
		const titleEl = document.getElementsByTagName("title")[0];
		if (titleEl) {
			titleEl.innerHTML =
				TitleTextInactive[Math.floor(Math.random() * TitleTextInactive.length)];
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

	const switchPaticles = () => {
		setParticlesSwitch((currParts) => {
			localStorage.setItem(particlesSwitchName, JSON.stringify(!currParts));
			return !currParts;
		});
	};

	const tabChanged = () => {
		setIsActive((curAct) => !curAct);
	};

	useEffect(() => {
		const nameLoop = setInterval(isActive ? loopActive : loopInactive, isActive ? 800 : 2000);
		document.addEventListener("keydown", darlingCodeChecker);
		document.addEventListener("visibilitychange", tabChanged);
		const localParts = localStorage.getItem(particlesSwitchName);

		localParts
			? setParticlesSwitch(JSON.parse(localParts.toLowerCase()))
			: localStorage.setItem(particlesSwitchName, "true");

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
				<link rel="manifest" href="/manifest.json" />
				{/* End Main Meta */}

				{/* Icons */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#656667" />
				{/* End Icons */}

				{/* Colors */}
				<meta name="msapplication-TileColor" content="#ffa9ff" />
				<meta name="theme-color" content="#ffa9ff" />
				{/* End Colors */}

				{/* Open Graph */}
				<meta property="og:url" content="https://www.pxseu.com" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content="pxseu.com" />
				<meta property="og:title" content="pxseu.com" />
				<meta
					property="og:image"
					content="https://www.pxseu.com/android-chrome-512x512.png"
				/>
				{/* End Open Graph */}

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@pxseu" />
				<meta name="twitter:title" content="pxseu.com" />
				<meta name="twitter:description" content="Pxseu's website!" />
				<meta
					name="twitter:image"
					content="https://www.pxseu.com/android-chrome-512x512.png"
				/>
				{/* End Twitter */}

				{/* Misc */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8"
				/>
				<meta
					name="google-site-verification"
					content="azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk"
				/>
				{/* End Misc */}
			</Head>
			{props.children}
			<div className={styles.particlesSwitch}>
				<label className={styles.switch}>
					<p className="visually_hidden noselect">Switch particles on or off</p>
					<input
						type="checkbox"
						className={styles.switchInput}
						checked={particlesSwitch}
						onChange={() => switchPaticles()}
					/>
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<PlatformParticles on={particlesSwitch} />
			<Modal open={darling} onClose={() => setDarling(false)}>
				I love you Darling!
			</Modal>
		</>
	);
};

export default memo(BackgroundLoader);
