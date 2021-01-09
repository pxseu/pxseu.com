import React, { memo } from "react";
import twemoji from "twemoji";
import styles from "../styles/components/Twemoji.module.css";

type props = {
	emoji: string;
};

const Twemoji = ({ emoji }: props) => (
	<>
		<span
			className={styles.emoji}
			dangerouslySetInnerHTML={{
				__html: twemoji.parse(emoji, {
					folder: "svg",
					ext: ".svg",
					className: styles.emoji,
				}),
			}}
		/>
	</>
);

export default memo(Twemoji);
