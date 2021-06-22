import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Navigation from "./navigation";

const Author: FC = (props: BoxProps) => (
	<Box as="header" py={4} px={{ base: "4", md: "8" }} background="gray.900" {...props}>
		<Flex justifyContent="space-between">
			<Text>uwu</Text>
			<Navigation />
		</Flex>
	</Box>
);

export default Author;
