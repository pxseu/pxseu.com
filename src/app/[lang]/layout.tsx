import { dir } from "i18next";
import { languages } from "@/i18n/settings";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { keyframes, styled } from "styled-components";

const LoadAnimation = keyframes`
	0% {
		background-position: 0%;
	}
	100% {
		background-position: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		0% {
			background-position: 0%;
		}
		100% {
			background-position: 0%;
		}
	}
`;

const Body = styled("body")`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	font-family: var(--font-primary);
	background-color: var(--color-background);
	background: repeating-linear-gradient(
		45deg,
		var(--color-background),
		var(--color-background) 10px,
		var(--color-background-stripe) 10px,
		var(--color-background-stripe) 20px
	);
	background-size: 120% 120%;
	background-position: 100%;
	animation: ${LoadAnimation} 1s ease;
`;

const Main = styled("main")`
	flex-grow: 1;
`;

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
