import { theme } from "@/conf/theme";
import "@/styles/global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";

NProgress.configure({
	showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
	<ChakraProvider theme={theme}>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
