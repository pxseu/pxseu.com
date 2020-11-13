import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";

type DefaultLayoutInput = {
	children: any;
	title: string;
	titleOnClick?: Function;
};

const DefaultLayout = ({
	title,
	children,
	titleOnClick,
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
				<div className='center noselect'>{children}</div>
			</div>
			<style jsx>{`
				.app {
					top: 100px;
				}
			`}</style>
		</BackgroundLoader>
	</>
);

export default DefaultLayout;
