import { theme } from "@/conf/theme";
import { useIsBirthday } from "@/hooks/useIsBirthday";
import { BoxProps, Flex, useBreakpointValue } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import React, { FC, useEffect, useState } from "react";
import { BIRTHDAY_TIMESTAMP } from "@/conf/globals";
import dynamic from "next/dynamic";
import Logo from "./logo";
import Navigation from "./navigation";
import MenuToggle from "./navToggle";

const BirthdayNotice = dynamic(() => import("./BirthdayNotice"));

const Author: FC<BoxProps> = (props) => {
	const isBirthday = useIsBirthday(BIRTHDAY_TIMESTAMP);
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
			position="sticky"
			alignSelf="flex-start"
			top={0}
			width="100%"
			as="header"
			flexDirection="column"
			zIndex={20}
			{...props}
		>
			{isBirthday ?? <BirthdayNotice />}

			<Flex
				position="relative"
				width="100%"
				py={4}
				px={{ base: "4", md: "8" }}
				justifyContent="space-between"
				wrap="wrap"
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
			>
				<Logo />

				<MenuToggle isOpen={isOpen} toggle={toggle} />
				<Navigation isOpen={isOpen} />
			</Flex>
		</Flex>
	);
};
export default Author;
