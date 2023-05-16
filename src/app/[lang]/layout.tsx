import { dir } from "i18next";
import { styled } from "@/../stitches.config";
import { languages } from "@/app/i18n/settings";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import StyleSheet from "@/components/StylesSheet";

const Body = styled("body", {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	minHeight: "100vh",
	backgroundColor: "$BACKGROUND",
	fontFamily: "$PRIMARY",
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
