import Head from "next/head";
import Link from "next/link";
import BackgroundLoader from "../components/BackgroundLoader";

const Index = () => (
	<>
		<Head>
			<title>pxseu</title>
			<meta
				data-n-head="ssr"
				data-hid="og:description"
				property="og:description"
				content="Home sweet homepage."
			/>
		</Head>
		<BackgroundLoader>
			<div className="app">
				<a className="skip-link" href="#linksSkip">
					Go to links!
				</a>
				<h1 className="logo noselect">pxseu</h1>

				<main id="linksSkip">
					<div className="links" id="links">
						<p>
							<Link href="/about">
								<a className="link noselect">About Me</a>
							</Link>
						</p>
						<p>
							<Link href="/projects">
								<a className="link noselect">My Projects</a>
							</Link>
						</p>
						<p>
							<a className="link noselect" href="https://discord.pxseu.com">
								Discord Server
							</a>
						</p>
					</div>
				</main>
			</div>
		</BackgroundLoader>
		<style jsx>{`
			.logo {
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				top: 119px;
				z-index: 2;
				animation: 1.5s ease-out 0s 1 fadeIn;
				cursor: pointer;
				text-align: center;
				color: #ffa9ff;
				font-size: 150px;
				font-family: "Gang of Three", Verdana, Arial;
				font-weight: normal;
			}

			.links {
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				top: 400px;
				z-index: 2;
				animation: 1.5s ease-out 0s 1 fadeIn;
				cursor: default;
				text-align: center;
			}

			p {
				display: inline;
				cursor: default;
				text-align: center;
			}

			.link {
				color: white;
				font-family: "Roboto", sans-serif;
				text-decoration: none;
				font-size: 30px;
				transition: color 0.1s;
				cursor: pointer;
				position: relative;
				top: 0;
				transition: top ease 0.2s, color 0.1s;
				padding: 15px 20px;
				position: relative;
			}

			.link:after {
				background: none repeat scroll 0 0 transparent;
				bottom: 0;
				content: "";
				display: block;
				height: 2px;
				left: 50%;
				position: absolute;
				background: #fff;
				transition: width 0.3s ease 0s, left 0.3s ease 0s;
				width: 0;
			}
			.link:hover:after {
				width: 100%;
				left: 0;
			}

			.link:hover {
				color: #ffa9ff;
				top: -2px;
			}

			@keyframes fadeIn {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}

			@keyframes in {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			@keyframes out {
				from {
					transform: rotate(360deg);
				}
				to {
					transform: rotate(0deg);
				}
			}
		`}</style>
	</>
);

export default Index;
