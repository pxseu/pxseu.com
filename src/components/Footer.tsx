// tell the user that they can change the language

import { styled } from "@/../stitches.config";
import { useTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";

const StyledFooter = styled("footer", {
	marginTop: "1.5rem",
	display: "flex",
	justifyContent: "space-between",
	fontSize: "1rem",
	lineHeight: "1rem",
	backgroundColor: "$SECONDARY_BACKGROUND",
	color: "$TEXT",
	padding: "1rem",
});

const Text = styled("p", {});

const LanguageWrapper = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
});

const Language = styled("span", {
	cursor: "pointer",
	fontSize: "1.3rem",
});

const LanguageToEmoji = {
	en: "🇬🇧",
	pl: "🇵🇱",
};

export async function Footer({ lang }: { lang: string }) {
	const { t } = await useTranslation(lang, "footer");

	return (
		<StyledFooter>
			<Text>
				©️ 2019-{new Date().getFullYear()} pxseu. {t("copyright_notice")}
			</Text>

			<LanguageWrapper>
				{languages.map((language) => (
					<Link href={`/${language}`} key={language}>
						<Language>{LanguageToEmoji[language]}</Language>
					</Link>
				))}
			</LanguageWrapper>
		</StyledFooter>
	);
}
