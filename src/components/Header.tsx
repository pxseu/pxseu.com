import { styled } from "@/../stitches.config";
import { useTranslation } from "@/app/i18n";
import NextLink from "next/link";
import Logo from "./Logo";
import HeaderObserver from "./HeaderObserver";

export const HEADER_ID = "header";
const TRANSITION_DURATION = 0.1;

const StyledHeader = styled("header", {
	position: "sticky",
	top: "-1px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "1rem",
	backdropFilter: "blur(0.5rem)",
	backgroundColor: "$SECONDARY_BACKGROUND_TRANSPARENT",
	color: "$TEXT",
	margin: "1.5rem",
	marginTop: "1.5rem",

	borderRadius: "0.5rem",
	fontSize: "1.5rem",
	lineHeight: "1.5rem",
	fontWeight: "bold",

	// for HeaderObserver :D
	"&.is-pinned": {
		marginLeft: "0",
		marginRight: "0",
		borderRadius: "0",

		// so it doesn't look weird when the header is pinned
		borderBottom: "2px solid $SECONDARY_BACKGROUND",
	},

	// slashes make it a single line :-)
	transition: `margin ${TRANSITION_DURATION}s ease-in-out, \
	border-radius ${TRANSITION_DURATION}s ease-in-out`,
});

const StyledLogo = styled(NextLink, {
	height: "2.5rem",
});

const LinksWrapper = styled("nav", {
	display: "flex",
	alignItems: "center",
	height: "100%",
});

const StyledLink = styled(NextLink, {
	color: "$white",
	padding: "0.5rem",
	height: "100%",
});

const HEADER_LINKS = [
	{
		href: "/aaaa",
		text_id: "header_aaaa",
	},
	{
		href: "/bbbb",
		text_id: "header_bbbb",
	},
];

export default async function Header({ lang }: { lang: string }) {
	const { t } = await useTranslation(lang, "header");

	return (
		<HeaderObserver>
			<StyledHeader id={HEADER_ID}>
				<StyledLogo href={`/${lang}`}>
					<Logo height="100%" width="100%" />
				</StyledLogo>

				<LinksWrapper>
					{HEADER_LINKS.map(({ href, text_id }) => (
						<StyledLink key={href} href={`/${lang}/${href}`}>
							{t(text_id)}
						</StyledLink>
					))}
				</LinksWrapper>
			</StyledHeader>
		</HeaderObserver>
	);
}
