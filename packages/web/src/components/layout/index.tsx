import { Fade, Flex, Text } from "@chakra-ui/react";
import { MotionStyle } from "framer-motion";
import React, { FC } from "react";
import Twemoji from "../utils/Twemoji";
import Footer from "./footer";
import Header from "./header";

const Layout: FC<MotionStyle> = ({ children, ...props }) => (
	<Flex flexDirection="column" minHeight="100vh">
		<Header />

		<Flex flexDirection="column" as="main" mt="4.5rem" flexGrow={1} py={6} px={{ base: "4", md: "8" }}>
			<noscript>
				<style>{"#_next_main_content { display: none; }"}</style>
				<Text fontSize="lg" textAlign="center">
					You need to enable JavaScript to run this app. <Twemoji emoji="❤" />
				</Text>
			</noscript>
			<Fade
				in
				id="_next_main_content"
				style={{
					flexGrow: 1,
					...props,
				}}
			>
				{children}
			</Fade>
		</Flex>

		<Footer />
	</Flex>
);

export default Layout;
