import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";
import Image from "next/image";

type DefaultLayoutInput = {
	children: any;
	title: string;
	titleOnClick?: Function;
	image: string;
};

const DefaultLayoutImage = ({ title, children, titleOnClick, image }: DefaultLayoutInput) => (
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
			<div className="app">
				<h1 className="center noselect">
					<a onClick={() => (titleOnClick == undefined ? void 0 : titleOnClick())}>
						{title}
					</a>
				</h1>
				<hr />
				<div className="container noselect">
					<div className="imgrow row">
						<img className="center" src={image} alt={"Image"} />
					</div>
					<div className="row">
						<div className="center">{children}</div>
					</div>
				</div>
				<div className="bottomPadding"></div>
			</div>
		</BackgroundLoader>
		<style jsx>{`
			.app {
				top: 100px;
			}
			.bottomPadding {
				padding: 20px;
			}

			.container {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: center;
				flex-wrap: wrap;
				width: 100%;
			}

			.row {
				flex: 1;
				display: inline-block;
			}

			.imgrow img {
				padding: 10px;
				height: 90%;
			}

			.imgrow {
				overflow: hidden;
			}

			@media screen and (min-width: 800px) {
				.container {
					flex-direction: row;
				}

				.imgrow img {
					height: auto;
					width: 90%;
				}
			}

			@media screen and (min-width: 1400px) {
				.imgrow img {
					width: 60%;
				}
			}
		`}</style>
	</>
);

export default DefaultLayoutImage;
