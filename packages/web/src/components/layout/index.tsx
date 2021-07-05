import React, { FC } from "react";
import { Flex, Box, Fade, BoxProps } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

const Layout: FC<BoxProps> = ({ children, ...props }) => (
	<Flex flexDirection="column" minHeight="100vh">
		<Header />
		<Box as="main" mt="20" flexGrow={1} py={6} px={{ base: "4", md: "8" }}>
			<Fade in>
				<Box {...props}>{children}</Box>
			</Fade>
		</Box>

		<Footer />
	</Flex>
);

export default Layout;
