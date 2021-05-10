import React, { memo } from "react";
import styles from "../styles/components/Badge.module.css";

type props = {
	badge: string;
};

const BadgeComp = ({ badge }: props) => (
	<div className={styles.badgeWrapper}>
		<img
			className={`${styles.badge} noselect`}
			draggable="false"
			src={`/assets/svg/badges/${badge}.svg`}
			alt={capitalizeFirstLetter(badge)}
			onDragStart={() => false}
		/>
	</div>
);

export default memo(BadgeComp);

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
