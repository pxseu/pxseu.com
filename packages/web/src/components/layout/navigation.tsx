import { Box, Button, ButtonGroup, ButtonGroupProps, SlideFade, useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";
import Link from "next/link";

interface INavigation extends ButtonGroupProps {
	isOpen: boolean;
}

const NavBase: FC<INavigation> = ({ isOpen, ...props }) => (
	<ButtonGroup
		spacing={[0, 2, 2, 2]}
		as="nav"
		display={{ base: isOpen ? "flex" : "none", md: "flex" }}
		variant="outline"
		size="sm"
		color="gray.600"
		mt={{ base: 0, small: 4 }}
		justifyContent={["center", "center", "flex-end", "flex-end"]}
		flexBasis={{ base: "100%", md: "auto" }}
		flexDirection={["column", "row", "row", "row"]}
		alignItems="center"
		{...props}
	>
		<Link href="/about" passHref>
			<Button as="a">About</Button>
		</Link>
		<Link href="/contact" passHref>
			<Button as="a" mt={[2, 0]}>
				Contact
			</Button>
		</Link>
		<Link href="/message" passHref>
			<Button as="a" mt={[2, 0]}>
				Message
			</Button>
		</Link>
	</ButtonGroup>
);

const Navigation: FC<INavigation> = ({ isOpen, ...props }) => {
	const isAnimated = useBreakpointValue({ base: true, md: false });

	return isAnimated ? (
		<Box flexBasis={{ base: "100%", md: "auto" }}>
			<SlideFade in={isOpen} offsetY="20px">
				<NavBase isOpen={isOpen} {...props} />
			</SlideFade>
		</Box>
	) : (
		<NavBase isOpen={isOpen} {...props} />
	);
};

export default Navigation;
