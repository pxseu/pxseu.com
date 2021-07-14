import { Discord, GitHub, Twitter } from "@/conf/links";
import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

const SocialMediaLinks: FC<ButtonGroupProps> = (props) => (
	<ButtonGroup variant="ghost" color="gray.600" {...props}>
		<IconButton
			as="a"
			href={Discord}
			aria-label="Discord"
			icon={<FaDiscord fontSize="20px" />}
			target="_blank"
			rel="noopener"
		/>
		<IconButton
			as="a"
			href={GitHub}
			aria-label="GitHub"
			icon={<FaGithub fontSize="20px" />}
			target="_blank"
			rel="noopener"
		/>
		<IconButton
			as="a"
			href={Twitter}
			aria-label="Twitter"
			icon={<FaTwitter fontSize="20px" />}
			target="_blank"
			rel="noopener"
		/>
	</ButtonGroup>
);

export default SocialMediaLinks;
