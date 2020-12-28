import Head from "next/head";
import BackgroundLoader from "../components/BackgroundLoader";
import Link from "next/link";
import { useRouter } from "next/router";

const Custom404 = () => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>404 | Not found</title>
				<meta
					data-n-head="ssr"
					data-hid="og:description"
					property="og:description"
					content="404 | Not found"
				/>
			</Head>
			<BackgroundLoader>
				<div className="app center noselect">
					<h1>
						<span className="fadeText">404</span> Not Found
					</h1>

					{router.pathname == router.asPath ? (
						<p>You're not funny</p>
					) : (
						<>
							<p>
								<code className="pathUrl">{router.asPath}</code>
							</p>
							<p>Is not on the server.</p>
						</>
					)}

					<p>
						<Link href="/">
							<button className="buttonNotFound">Go home</button>
						</Link>
					</p>
				</div>
			</BackgroundLoader>
			<style jsx>{`
				.pathUrl {
					display: block;
					white-space: pre-wrap;
					background-color: #303030;
					padding: 0.5rem;
					border-radius: 0.5rem;
					word-wrap: break-word;
				}

				.buttonNotFound {
					position: relative;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					padding: 1rem 1.5rem;
					color: white;
					cursor: pointer;
					outline: none;
					border-radius: 100px;
					border: 2px solid white;
					background: none;
					transition-duration: 0.2s;
					font-size: 16px;
				}

				.buttonNotFound:hover {
					color: black;
					border: 2px solid black;
					background-color: white;
				}
			`}</style>
		</>
	);
};

export default Custom404;
