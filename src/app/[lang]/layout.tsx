import { dir } from "i18next";
import { keyframes, styled } from "@/../stitches.config";
import { languages } from "@/app/i18n/settings";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import StyleSheet from "@/components/StylesSheet";

const LoadAnimation = keyframes({
	"0%": { backgroundPosition: "0%" },
	"100%": { backgroundPosition: "100%" },

	"@media (prefers-reduced-motion: reduce)": {
		"0%": { backgroundPosition: "0%" },
		"100%": { backgroundPosition: "0%" },
	},
});

const Body = styled("body", {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	minHeight: "100vh",
	fontFamily: "$PRIMARY",
	backgroundColor: "$BACKGROUND",
	background:
		"repeating-linear-gradient(35deg, $BACKGROUND, $BACKGROUND 10px, $BACKGROUND_STRIPE 10px, $BACKGROUND_STRIPE 20px)",
	backgroundSize: "120% 120%",
	backgroundPosition: "100%",
	animation: `${LoadAnimation} 1s ease`,
});

const Main = styled("main", {
	flexGrow: 1,
});

export async function generateStaticParams() {
	return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
	children,
	params: { lang },
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	return (
		<html lang={lang} dir={dir(lang)}>
			<head>
				{/* @ts-expect-error Async Server Component */}
				<StyleSheet />
			</head>

			<Body>
				{/* @ts-expect-error Async Server Component */}
				<Header lang={lang} />
				<Main>{children}</Main>
				{/* @ts-expect-error Async Server Component */}
				<Footer lang={lang} />
			</Body>
		</html>
	);
}
