import Link from "next/link";
import { styled } from "../../../stitches.config";
import { useTranslation } from "../i18n";

const StyledDiv = styled("div", {
	justifySelf: "center",
	alignSelf: "center",
	fontSize: "2rem",
	color: "white",
});

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
	const { t } = await useTranslation(lang, "index");

	return {
		title: t("title"),
	};
}
export default async function Home({ params: { lang } }: { params: { lang: string } }) {
	const { t } = await useTranslation(lang, "index");

	return (
		<>
			<StyledDiv>{t("title")}</StyledDiv>
			<StyledDiv>
				<Link href={`/${lang}/aaaa`}>Go to aaaa</Link>
			</StyledDiv>
			<StyledDiv>Language: {lang}</StyledDiv>
		</>
	);
}
