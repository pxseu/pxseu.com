import React, { memo } from "react";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";
import Head from "next/head";
import style from "./DefaultLayoutMedia.module.css";

type DefaultLayoutInput = {
	children: any;
	title: string;
	titleOnClick?: () => void;
	image?: string;
	video?: string;
	mediaType?: "image" | "video";
};

const DefaultLayoutImage = ({
	title,
	children,
	titleOnClick,
	image,
	video,
	mediaType,
}: DefaultLayoutInput) => (
	<>
		<Head>
			<title>{title}</title>
			<meta property="og:description" content={title} />
		</Head>
		<BackgroundLoader>
			<Navbar />
			<div className={`noselect ${style.app} app`}>
				<h1 className="center">
					<a onClick={() => titleOnClick != undefined && titleOnClick()}>{title}</a>
				</h1>
				<hr />
				<div className={style.container}>
					<div className={`${style.imgrow} ${style.row}`}>
						{mediaType == "image" && (
							<img draggable="false" className="center" src={image} alt={"Image"} />
						)}
						{mediaType == "video" && (
							<video
								className="center"
								src={video}
								autoPlay={true}
								loop={true}
								muted={true}
								controls={false}
							/>
						)}
					</div>
					<div className={style.row}>
						<div className="center">{children}</div>
					</div>
				</div>
				<div className={style.bottomPadding}></div>
			</div>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayoutImage);
