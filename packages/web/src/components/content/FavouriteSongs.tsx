import React, { FC } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import Image from "next/image";
import { TopSongs } from "@pxseu-dot-com/web";
import SongCard from "../utils/SongCard";
import Linkify from "../utils/Linkify";

const THUMB_HEIGHT = 100;

interface IFavouriteAnime extends FlexProps {
	songs: TopSongs;
}

const FavouriteSongs: FC<IFavouriteAnime> = ({ songs, ...props }) => (
	<Flex justifyContent={{ base: "center", small: "flex-start" }} alignItems="center" flexWrap="wrap" {...props}>
		{songs.tracks.slice(0, 6).map((data) => (
			<SongCard
				imageTooltip={data.song.name}
				image={
					<Image
						alt={`${data.song.name} album cover`}
						src={data.album.image}
						height={THUMB_HEIGHT}
						width={THUMB_HEIGHT}
					/>
				}
				title={
					<Linkify link={data.song.url}>
						<b title={data.song.name}>{data.song.name}</b>
					</Linkify>
				}
				artists={
					data.song.artists && (
						<>
							by <b title={data.song.artists}>{data.song.artists}</b>
						</>
					)
				}
				album={
					data.album.name && (
						<>
							on{" "}
							<Linkify link={data.album.url}>
								<b title={data.album.name}>{data.album.name}</b>
							</Linkify>
						</>
					)
				}
				flexProps={{
					minWidth: "300px",
					flex: "1",
					margin: "2",
					transition: "box-shadow, transform ease-in-out 100ms",
					cursor: "pointer",
					_hover: {
						boxShadow: "md",
						transform: "scale(1.02, 1.02)",
					},
					...props,
				}}
				key={data.song.name}
			/>
		))}
	</Flex>
);

export default FavouriteSongs;
