import { Box, BoxProps, Flex, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import Link from "next/link";
import Navigation from "./navigation";
import Logo from "./logo";

const Author: FC<BoxProps> = (props) => (
	<Box as="header" py={4} px={{ base: "4", md: "8" }} background="gray.900" {...props}>
		<Flex justifyContent="space-between">
			<Link href="/" passHref>
				<IconButton variant="ghost" as="a" aria-label="Logo" p={2} icon={<Logo />} />
			</Link>

			<Navigation />
		</Flex>
	</Box>
);

export default Author;
