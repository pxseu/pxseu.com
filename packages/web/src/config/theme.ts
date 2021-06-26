import { extendTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";

export const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	colors: {
		brand: {
			100: "#00CCFF",
			900: "#FF00EE",
		},
	},
});

export const GlobalStyles = css`
	.js-focus-visible :focus:not([data-focus-visible-added]) {
		outline: none;
		box-shadow: none;
	}
`;

export default theme;
