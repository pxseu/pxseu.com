import React, { memo } from "react";
import twemoji from "twemoji";

type props = {
	emoji: string;
};

const Twemoji = ({ emoji }: props) => (
	<>
		<span
			className="emoji"
			dangerouslySetInnerHTML={{
				__html: twemoji.parse(emoji, {
					folder: "svg",
					ext: ".svg",
				}),
			}}
		/>
		<style jsx global>{`
			.emoji {
				display: inline-block;
				width: auto;
				height: 1em;
				vertical-align: -0.125em;
			}
		`}</style>
	</>
);

export default memo(Twemoji);
