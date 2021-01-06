import React, { memo, ReactNode } from "react";
import Head from "next/head";
import Particles from "react-particles-js";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import Modal from "./Modal";

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
				<meta charSet="UTF-8" />
				<meta name="description" content="Pxseu's website!" />
				<meta name="keywords" content="pxseu, poseuxck" />
				<meta name="author" content="pxseu" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#656667" />
				<meta name="msapplication-TileColor" content="#ffa9ff" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
				<meta name="theme-color" content="#ffa9ff" />
				<meta property="og:site_name" content="pxseu.com" />
				<meta property="og:title" content="pxseu.com" />
				<meta property="og:image" content="https://www.pxseu.com/images/icon-512x512.png" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, minimal-ui"
				/>
				{/* <script src='/essential/js/script.js'defer  /> */}
				<meta name="viewport" content="width=device-width, initial-scale=0.8" />
				<meta
					name="google-site-verification"
					content="azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk"
				/>
			</Head>
			{props.children}
			<div className="particlesSwitch">
				<label className="switch">
					<p className="visually_hidden">Switch particles on or off</p>
					<input
						type="checkbox"
						id="switchLabel"
						checked={particlesSwitch}
						onChange={() => switchPaticles()}
					/>
					<span className="slider round"></span>
				</label>
			</div>
			<style jsx>{`
				.particlesSwitch {
					position: fixed;
					bottom: 0;
					left: 0;
					z-index: 5;
					background-color: ${particlesSwitch
						? "rgba(44, 44, 44, 0.2)"
						: "rgba(0, 0, 0, 0.2)"};
					width: 80px;
					/* padding: 10px; */
					border-radius: 20px;
				}

				.switch {
					position: relative;
					display: inline-block;
					width: 60px;
					height: 34px;
				}
				.switch input {
					opacity: 0;
					width: 0;
					height: 0;
				}
				.slider {
					position: absolute;
					cursor: pointer;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: #ccc;
					-webkit-transition: 0.4s;
					transition: 0.4s;
				}
				.slider:before {
					position: absolute;
					content: "";
					height: 26px;
					width: 26px;
					left: 4px;
					bottom: 4px;
					background-color: white;
					-webkit-transition: 0.4s;
					transition: 0.4s;
				}
				input:checked + .slider {
					background-color: #ffa9ff;
				}
				input:focus + .slider {
					box-shadow: 0 0 1px #ffa9ff;
				}
				input:checked + .slider:before {
					-webkit-transform: translateX(26px);
					-ms-transform: translateX(26px);
					transform: translateX(26px);
				}
				.slider.round {
					border-radius: 34px;
				}
				.slider.round:before {
					border-radius: 50%;
				}
			`}</style>
			<PlatformParticles on={particlesSwitch} />
			<Modal open={darling} onClose={() => setDarling(false)}>
				I love you Darling!
			</Modal>
		</>
	);
};

export default memo(BackgroundLoader);
