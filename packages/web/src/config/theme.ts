import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	colors: {
		brand: {
			100: "#00CCFF",
			500: "#8066F7",
			900: "#FF00EE",
		},
	},
});

export default theme;
