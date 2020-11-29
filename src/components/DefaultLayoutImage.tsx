import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";

type DefaultLayoutInput = {
	children: any;
	title: string;
	titleOnClick?: Function;
	image: string;
};

const DefaultLayoutImage = ({
	title,
	children,
	titleOnClick,
	image,
}: DefaultLayoutInput) => (
	<>
		<Head>
			<title>{title}</title>
			<meta
				data-n-head='ssr'
				data-hid='og:description'
				property='og:description'
				content={title}
			/>
		</Head>
		<BackgroundLoader>
			<Navbar />
			<div className='app'>
				<h1 className='center noselect'>
					<a
						onClick={() =>
							titleOnClick == undefined ? void 0 : titleOnClick()
						}>
						{title}
					</a>
				</h1>
				<hr />
				<div className='imagecontainer'>
					<img src={image} alt={"Image"} />
				</div>
				<div className='center noselect'>{children}</div>
				<div className='bottomPadding'></div>
			</div>
		</BackgroundLoader>
		<style jsx>{`
			.app {
				top: 100px;
			}
			.bottomPadding {
				padding: 20px;
			}
		`}</style>
	</>
);

export default DefaultLayoutImage;
