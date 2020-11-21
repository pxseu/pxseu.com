import Head from "next/head";
import Particles from "react-particles-js";
import { isMobile } from "react-device-detect";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const MobileFriendly = () => {
	let particlesConfig: any;
	if (isMobile) {
		particlesConfig = require("../../particlesjs-config.mobile.json");
	} else {
		particlesConfig = require("../../particlesjs-config.json");
	}

	return <Particles className='particles-js' params={particlesConfig} />;
};

const BackgroundLoader = (props: { children: any }) => {
	const [particlesSwitch, setParticlesSwitch] = useState(true);

	let x = 0;

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

	function loop() {
		document.getElementsByTagName("title")[0].innerHTML =
			TitleText[x++ % TitleText.length];
	}

	useEffect(() => {
		const nameLoop = setInterval(loop, 800);

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
				\
				<meta
					name='google-site-verification'
					content='azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk'
				/>
			</Head>
			{props.children}

			<div className='particlesSwitch'>
				{/* <div className='switchText'>Toggle Particles:</div> */}
				<input
					type='checkbox'
					id='switch'
					checked={particlesSwitch}
					onChange={() => {
						setParticlesSwitch(!particlesSwitch);
					}}
				/>
				<label htmlFor='switch' id='switchLabel'>
					Toggle
				</label>
			</div>
			<style jsx global>{`
				body {
					background-color: black;
				}
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
				input[type="checkbox"] {
					height: 0;
					width: 0;
					padding: 0;
					margin: 0;
					visibility: hidden;
				}
				label {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					cursor: pointer;
					text-indent: -9999px;
					width: calc(200px * 0.3);
					height: calc(100px * 0.3);
					background: grey;
					display: block;
					border-radius: calc(100px * 0.3);
					position: relative;
				}

				label:after {
					content: "";
					position: absolute;
					top: calc(5px * 0.3);
					left: calc(5px * 0.3);
					width: calc(90px * 0.3);
					height: calc(90px * 0.3);
					background: #fff;
					border-radius: calc(90px * 0.3);
					transition: 0.3s;
				}

				input:checked + label {
					background: #bada55;
				}

				input:checked + label:after {
					left: calc(100% - 5px);
					transform: translateX(-100%);
				}

				label:active:after {
					width: calc(130px * 0.3);
				}
			`}</style>
			{particlesSwitch == true ? <MobileFriendly /> : null}
		</>
	);
};

export default BackgroundLoader;
