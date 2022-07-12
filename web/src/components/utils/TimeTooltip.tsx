import { chakra, ChakraProps, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";

interface ITimeTooltip extends ChakraProps {
	time: number;
	timeText: string;
}

const TimeTooltip: FC<ITimeTooltip> = ({ time, timeText, ...props }) => (
	<Tooltip aria-label="Full age" label={time.toString().substring(0, 12)} hasArrow placement="top">
		<chakra.span textDecoration="underline" {...props}>
			{Math.floor(time)} {timeText}
		</chakra.span>
	</Tooltip>
);

export default TimeTooltip;
