import React, { FC } from "react";
import { Flex, Box, Fade, BoxProps, Text } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";
import Twemoji from "../utils/Twemoji";

const Layout: FC<BoxProps> = ({ children, ...props }) => (
	<Flex flexDirection="column" minHeight="100vh">
		<Header />
		<Box as="main" mt="20" flexGrow={1} py={6} px={{ base: "4", md: "8" }}>
			<noscript>
				<style>{"#_next_main_content { display: none; }"}</style>
				<Text fontSize="lg" textAlign="center">
					You need to enable JavaScript to run this app. <Twemoji emoji="❤" />
				</Text>
			</noscript>
			<Fade in id="_next_main_content">
				<Box {...props}>{children}</Box>
			</Fade>
		</Box>

		<Footer />
	</Flex>
);

export default Layout;
