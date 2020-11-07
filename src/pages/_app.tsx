import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/global.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }) => (
	<>
		<Component {...pageProps} />
		<div id='portal'></div>
	</>
);

export default App;
