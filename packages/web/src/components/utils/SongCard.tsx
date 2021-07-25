import { Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardProps {
	flexProps: FlexProps;
	image: ReactNode;
	title: ReactNode;
	artists?: ReactNode;
	album?: ReactNode;
	color?: string;
	imageTooltip?: string;
	isNoData?: boolean;
}

const SongCard: FC<CardProps> = ({ color, image, title, artists, album, imageTooltip, isNoData, flexProps }) => (
	<Flex
		minWidth="200px"
		flex={1}
		display="flex"
		width="90%"
		backgroundColor="blackAlpha.400"
		p={2.5}
		borderRadius={10}
		boxShadow="md"
		alignItems="center"
		transition="box-shadow, transform ease-in-out 100ms"
		cursor="pointer"
		_hover={{
			transform: "scale(1.02, 1.02)",
		}}
		flexDirection={["column", "row"]}
		{...flexProps}
	>
		<Tooltip
			label={imageTooltip && <Text textAlign="center">{imageTooltip}</Text>}
			aria-label="A tooltip"
			hasArrow
			placement="top"
		>
			<Flex
				borderRadius={8}
				overflow="hidden"
				justifyContent="center"
				alignItems="center"
				boxShadow="md"
				minWidth={100}
				width="100%"
				flex={1}
				backgroundColor={color ?? "gray.800"}
				height={100}
			>
				{image}
			</Flex>
		</Tooltip>
		<Flex
			display="inline-flex"
			flexDirection="column"
			justifyContent="space-between"
			width="100%"
			py={2}
			px={4}
			overflow="hidden"
		>
			<Text fontSize="xl" textAlign={["center", "left"]} isTruncated={!isNoData}>
				{title}
			</Text>
			{artists && (
				<Text textAlign={["center", "left"]} isTruncated>
					{artists}
				</Text>
			)}
			{album && (
				<Text textAlign={["center", "left"]} isTruncated>
					{album}
				</Text>
			)}
		</Flex>
	</Flex>
);

export default SongCard;
