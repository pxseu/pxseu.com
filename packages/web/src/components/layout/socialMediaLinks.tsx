import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import { Discord, GitHub, Twitter } from "../../config/links";

const SocialMediaLinks: FC = (props: ButtonGroupProps) => (
	<ButtonGroup variant="ghost" color="gray.600" {...props}>
		<IconButton as="a" href={Discord} aria-label="Discord" icon={<FaDiscord fontSize="20px" />} target="_blank" />
		<IconButton as="a" href={GitHub} aria-label="GitHub" icon={<FaGithub fontSize="20px" />} target="_blank" />
		<IconButton as="a" href={Twitter} aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} target="_blank" />
	</ButtonGroup>
);

export default SocialMediaLinks;
