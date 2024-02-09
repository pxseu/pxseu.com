import { styled } from "@/../stitches.config";
import { GitHub } from "@/config";
import NextImage from "next/image";

const Wrapper = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.15rem",
	borderRadius: "50%",
	margin: "1rem",
	background: "linear-gradient(to right, $BRAND_100, $BRAND_900)",
});

const Image = styled(NextImage, {
	borderRadius: "50%",
});

const SIZE = 150;

export default function Avatar() {
	return (
		<Wrapper>
			<Image src={`${GitHub}.png`} width={SIZE} height={SIZE} quality="100" priority alt="My Github Avatar" />
		</Wrapper>
	);
}
