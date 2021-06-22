import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import theme from "../components/theme";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
	<ChakraProvider theme={theme}>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
