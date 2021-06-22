import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React from "react";
import Copyright from "./copyright";
import SocialMediaLinks from "./socialMediaLinks";

const Footer = (props: BoxProps) => (
	<Box as="footer" role="contentinfo" py="6" px={{ base: "4", md: "8" }} background="gray.900" {...props}>
		<Flex direction={{ base: "column-reverse", md: "row" }} justifyContent="space-between" alignItems="center">
			<Copyright />
			<SocialMediaLinks />
		</Flex>
	</Box>
);

export default Footer;
