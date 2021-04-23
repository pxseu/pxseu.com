import Head from "next/head";
import React, { memo, ReactNode } from "react";
import styles from "../styles/components/DefaultLayoutMedia.module.css";
import BackgroundLoader from "./BackgroundLoader";
import Navbar from "./Navbar";

type DefaultLayoutInput = {
	children: ReactNode;
	title: string;
	titleOnClick?: () => void;
	image?: string;
	video?: string;
	mediaType?: "image" | "video";
};

const DefaultLayoutImage = ({ title, children, titleOnClick, image, video, mediaType }: DefaultLayoutInput) => (
	<>
		<Head>
			<title>{title}</title>
			<meta property="og:description" content={title} />
		</Head>
		<BackgroundLoader>
			<Navbar />
			<div className={`noselect ${styles.app} app`}>
				<h1 className="center">
					<a
						className={titleOnClick ? "link" : ""}
						onClick={() => {
							if (titleOnClick) titleOnClick();
						}}>
						{title}
					</a>
				</h1>
				<hr />
				<div className={styles.container}>
					<div className={`${styles.imgrow} ${styles.row}`}>
						{mediaType == "image" && <img draggable="false" className="center" src={image} alt={"Image"} />}
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
					<div className={styles.row}>
						<div className="center">{children}</div>
					</div>
				</div>
				<div className={styles.bottomPadding}></div>
			</div>
		</BackgroundLoader>
	</>
);

export default memo(DefaultLayoutImage);
