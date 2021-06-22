import { Button, ButtonGroup, ButtonGroupProps } from "@chakra-ui/react";
import React, { FC } from "react";
import Link from "next/link";

const Navigation: FC = (props: ButtonGroupProps) => (
	<ButtonGroup as="nav" variant="outline" size="sm" color="gray.600" {...props}>
		<Link href="/about" passHref>
			<Button as="a">About</Button>
		</Link>
		<Link href="/message" passHref>
			<Button as="a">Message</Button>
		</Link>
	</ButtonGroup>
);

export default Navigation;
