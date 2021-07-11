import { Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardProps {
	flexProps: FlexProps;
	image: ReactNode;
	title: ReactNode;
	artists?: ReactNode;
	album?: ReactNode;
	imageTooltip?: string;
	isNoData?: boolean;
}

const SongCard: FC<CardProps> = ({ image, title, artists, album, imageTooltip, isNoData, flexProps }) => (
	<Flex
		display="inline-flex"
		backgroundColor="blackAlpha.400"
		p={2.5}
		borderRadius={10}
		boxShadow="md"
		alignItems="center"
		transition="box-shadow, transform ease-in-out 100ms"
		cursor="pointer"
		_hover={{
			boxShadow: "md",
			transform: "scale(1.02, 1.02)",
		}}
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
				width={100}
				height={100}
			>
				{image}
			</Flex>
		</Tooltip>
		<Flex
			display="inline-flex"
			flexDirection="column"
			justifyContent="space-between"
			py={2}
			px={4}
			overflow="hidden"
			// maxWidth={{ base: "220", md: "300", xl: "500" }}
		>
			<Text fontSize="xl" isTruncated={!isNoData}>
				{title}
			</Text>
			{artists && <Text isTruncated>{artists}</Text>}
			{album && <Text isTruncated>{album}</Text>}
		</Flex>
	</Flex>
);

export default SongCard;
