import Head from "next/head";
import Particles from "react-particles-js";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

const particlesSwitchName = "particlesSwitch";

const PlatformParticles = () => {
	let particlesConfig: any;
	if (isMobile) {
		particlesConfig = require("../../particlesjs-config.mobile.json");
	} else {
		particlesConfig = require("../../particlesjs-config.json");
	}

	return <Particles className='particles-js' params={particlesConfig} />;
};

const BackgroundLoader = (props: { children: any }) => {
	let x = 0;

	const [particlesSwitch, setParticlesSwitch] = useState(true);
	const TitleText = [
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
	];

	const switchPaticles = () => {
		setParticlesSwitch((currParts) => {
			localStorage.setItem(
				particlesSwitchName,
				JSON.stringify(!currParts),
			);
			return !currParts;
		});
	};
	const loop = () => {
		const titleEl = document.getElementsByTagName("title")[0];
		titleEl
			? (titleEl.innerHTML = TitleText[x++ % TitleText.length])
			: null;
	};

	useEffect(() => {
		const nameLoop = setInterval(loop, 800);
		const localParts = localStorage.getItem(particlesSwitchName);

		localParts
			? setParticlesSwitch(JSON.parse(localParts.toLowerCase()))
			: localStorage.setItem(particlesSwitchName, "true");

		return () => {
			clearInterval(nameLoop);
		};
	}, []);

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='description' content="Pxseu's website!" />
				<meta name='keywords' content='pxseu, poseuxck' />
				<meta name='author' content='pxseu' />
				<link rel='shortcut' href='/favicon.ico' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='favicon' href='/favicon.ico' />
				<meta
					data-n-head='ssr'
					data-hid='theme-color'
					name='theme-color'
					content='#6ab04c'
				/>
				<meta
					data-n-head='ssr'
					data-hid='og:site_name'
					property='og:site_name'
					content='pxseu.com'
				/>
				<meta
					data-n-head='ssr'
					data-hid='og:title'
					property='og:title'
					content='pxseu.com'
				/>
				<meta
					data-n-head='ssr'
					data-hid='og:image'
					property='og:image'
					content='https://www.pxseu.com/essential/media/icon.png'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, minimal-ui'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
					rel='stylesheet'
				/>
				{/* <script src='/essential/js/script.js'defer  /> */}
				<meta
					name='viewport'
					content='width=device-width, initial-scale=0.8'
				/>
				<meta
					name='google-site-verification'
					content='azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk'
				/>
			</Head>
			{props.children}

			<div className='particlesSwitch'>
				<label className='switch'>
					<input
						type='checkbox'
						id='switchLabel'
						checked={particlesSwitch}
						onChange={() => switchPaticles()}
					/>
					<span className='slider round'></span>
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
				.switchText {
					text-align: center;
					padding: 0;
					margin: 0;
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
			{particlesSwitch == true ? <PlatformParticles /> : null}
		</>
	);
};

export default BackgroundLoader;
