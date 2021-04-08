import React, { ReactNode } from "react";
import styles from "../styles/components/LinkText.module.css";
import Twemoji from "./Twemoji";

interface ContactPlacesData {
	href: string;
	emoji?: string;
	children: ReactNode;
}

export const StyledLink = ({ emoji, href, children }: ContactPlacesData): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			{emoji && (
				<div className={styles.emoji}>
					<Twemoji emoji={emoji} />
				</div>
			)}
			<div className={styles.content}>
				<a href={href} target="_blank" rel="noreferrer">
					{children}
				</a>
			</div>
		</div>
	);
};
