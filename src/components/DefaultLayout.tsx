import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";

const DefaultLayout = (props: { children: any }) => (
	<BackgroundLoader>
		<Navbar />
		<div className='app'>{props.children}</div>
		<style jsx>{`
			.app {
				top: 100px;
			}
		`}</style>
	</BackgroundLoader>
);

export default DefaultLayout;
