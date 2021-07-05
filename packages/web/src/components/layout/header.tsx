import { BoxProps, Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";
import { transparentize } from "@chakra-ui/theme-tools";
import { theme } from "@/conf/theme";
import Navigation from "./navigation";
import Logo from "./logo";
import MenuToggle from "./navToggle";

const Author: FC<BoxProps> = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const shouldCloseNavbar = useBreakpointValue({ base: false, md: true });

	const toggle = () => setIsOpen((value) => !value);

	useEffect(() => {
		const resizeHandler = () => shouldCloseNavbar && setIsOpen(false);

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [shouldCloseNavbar]);

	return (
		<Flex
			position="fixed"
			width="100%"
			alignSelf="flex-start"
			as="header"
			py={4}
			px={{ base: "4", md: "8" }}
			justifyContent="space-between"
			wrap="wrap"
			zIndex={20}
			_before={{
				// eslint-disable-next-line @typescript-eslint/quotes
				content: '""',
				position: "absolute",
				top: "0px",
				left: "0px",
				right: "0px",
				bottom: "0px",
				background: transparentize("gray.900", 0.8)(theme),
				backdropFilter: "blur(5px)",
			}}
			borderBottomStyle="solid"
			borderBottomColor="gray.900"
			borderBottomWidth="1px"
			{...props}
		>
			<Logo />

			<MenuToggle isOpen={isOpen} toggle={toggle} />
			<Navigation isOpen={isOpen} />
		</Flex>
	);
};
export default Author;
