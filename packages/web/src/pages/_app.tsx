import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "focus-visible/dist/focus-visible";
import { theme, GlobalStyles } from "../config/theme";

NProgress.configure({
	showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
	<ChakraProvider theme={theme}>
		<Global styles={GlobalStyles} />
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
