import { Box } from "@chakra-ui/react";
import React, { memo } from "react";
import twemoji from "twemoji";
import styles from "../../styles/components/Twemoji.module.scss";

interface Props {
	emoji: string;
}

const Twemoji = ({ emoji }: Props) => (
	<Box
		as="span"
		display="inline-block"
		width="auto"
		height="1em"
		verticalAlign="-0.05em"
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{
			__html: twemoji.parse(emoji, {
				folder: "svg",
				ext: ".svg",
				className: styles.emoji,
			}),
		}}
	/>
);

export default memo(Twemoji);
