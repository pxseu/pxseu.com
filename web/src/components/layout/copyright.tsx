import { Text, TextProps } from "@chakra-ui/react";
import React, { FC } from "react";

const Copyright: FC<TextProps> = (props) => (
	<Text fontSize="sm" {...props}>
		&copy; 2019-{new Date().getFullYear()} pxseu. All rights reserved.
	</Text>
);
export default Copyright;
