import React, { FC } from "react";
import { Flex, Box, Fade } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

const Layout: FC = ({ children }) => (
	<Flex flexDirection="column" minHeight="100vh">
		<Header />
		<Box as="main" flexGrow={1} py={6} px={{ base: "4", md: "8" }}>
			<Fade in>{children}</Fade>
		</Box>
		<Footer />
	</Flex>
);

export default Layout;
