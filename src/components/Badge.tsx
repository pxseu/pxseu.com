import React, { memo } from "react";

type props = {
	badge: string;
};

const BadgeComp = ({ badge }: props) => (
	/* Not wrapped in a div because of better layout */
	<>
		<img
			className="badge noselect"
			draggable="false"
			src={`/assets/svg/badges/${badge}.svg`}
			alt={capitalizeFirstLetter(badge)}
			onDragStart={() => false}
		/>
		<style jsx>{`
			.badge {
				display: inline-block;
				width: auto;
				height: 1.8rem;
				vertical-align: -0.125rem;
			}
		`}</style>
	</>
);

export default memo(BadgeComp);

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
