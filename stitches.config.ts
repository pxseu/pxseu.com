import { createStitches } from "@stitches/react";
import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({
	preload: true,
	weight: "300",
	subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
	preload: true,
	weight: "500",
	subsets: ["latin"],
});

const stitches = createStitches({
	theme: {
		colors: {
			BACKGROUND: "#0A0B0B",
			SECONDARY_BACKGROUND: "#1A1B1B",
			SECONDARY_BACKGROUND_TRANSPARENT: "rgba(26, 27, 27, 0.8)",
			TEXT: "#FFFFFF",
			BRAND_100: "#00CCFF",
			BRAND_500: "#8066F7",
			BRAND_900: "#FF00EE",
		},
		fonts: {
			PRIMARY: `${roboto.style.fontFamily}, sans-serif`,
			MONO: `${robotoMono.style.fontFamily}, monospace`,
		},
	},
});

export const globalStyles = stitches.globalCss({
	"*, *:before, *:after": {
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
	},
});

export const { styled, css, keyframes, getCssText, theme, config } = stitches;
