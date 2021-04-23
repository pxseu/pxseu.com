import React, { useRef } from "react";
import PageWithTitle from "../components/PageWithTitle";
import styles from "../styles/pages/WebUserAgent.module.css";

const USER_AGENT = "pxseu/1.0; (+https://www.pxseu.com/pxseu-web-agent)";

const WebUserAgent = (): JSX.Element => {
	const codeBlock = useRef<HTMLDivElement>(null);

	return (
		<PageWithTitle title={"Pxseu User-Agent"}>
			<p>If you&lsquo;re here you must have saw this User-Agent:</p>
			<div
				className={styles.codeBlock}
				ref={codeBlock}
				title="Click to copy!"
				onClick={() => {
					navigator.clipboard.writeText(USER_AGENT);
				}}>
				{USER_AGENT}
			</div>
			<p>This is the User-Agent that I use for most of my API wrappers.</p>
			<p>Please do not worry, you&lsquo;re not getting hacked!</p>
		</PageWithTitle>
	);
};

export default WebUserAgent;
