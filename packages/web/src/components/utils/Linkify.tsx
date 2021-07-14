import { Link } from "@chakra-ui/react";
import React, { FC } from "react";

interface LinkifyProps {
	link?: string;
}

const Linkify: FC<LinkifyProps> = ({ children, link }) => {
	if (!link) return <>{children}</>;

	return (
		<Link
			as="a"
			href={link}
			variant="link"
			target="_blank"
			rel="noopener"
			transitionProperty="text-decoration-color"
			transitionDuration="200ms"
			textDecoration="underline"
			textDecorationColor="brand.100"
			textDecorationThickness="2px"
			_hover={{
				textDecorationColor: "brand.900",
			}}
		>
			{children}
		</Link>
	);
};

export default Linkify;
