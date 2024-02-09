import Avatar from "@/components/Avatar";
import { styled } from "../../../stitches.config";
import { useTranslation } from "@/i18n";

const Card = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "0.5rem",
	padding: "1rem",
	margin: "1rem",
	marginTop: "1.5rem",
	backgroundColor: "$SECONDARY_BACKGROUND",
});

const CardContent = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
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
		<Card>
			<Avatar />
			<CardContent>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat sapiente quasi ut nam reprehenderit
				perferendis labore. Rem id, in dignissimos molestiae nulla explicabo sunt temporibus officiis nesciunt
				nisi. Dolores autem quibusdam corrupti expedita provident esse nam unde veniam fugit ducimus pariatur
				eveniet, eligendi velit? Eaque ducimus velit et voluptatibus facere nisi similique accusantium ea eos
				sequi officiis vitae vero ab labore, ipsa earum, consectetur ex magni voluptatem quaerat temporibus
				architecto. Nihil minus perspiciatis quas quam perferendis, ipsam amet ipsa vel harum laboriosam
				eligendi corrupti natus dignissimos at? Quae soluta facere animi, sed harum in doloremque officia fuga
				corporis dolorem enim.
			</CardContent>
		</Card>
	);
}
