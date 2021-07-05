import { Flex } from "@chakra-ui/react";
import React, { memo } from "react";
import twemoji from "twemoji";
import styles from "@/styles/components/Twemoji.module.scss";

interface Props {
	emoji: string;
}

const Twemoji = ({ emoji }: Props) => (
	<Flex
		className={styles.emoji}
		display="inline"
		as="span"
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
