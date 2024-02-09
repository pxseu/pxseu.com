import { createGlobalStyle } from "styled-components";
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

const globalCss = createGlobalStyle`
    *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

