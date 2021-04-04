import React from "react";
import Link from "next/link";
import Age from "../components/Age";
import Badges from "../components/Badges";
import PageWithTitle from "../components/DefaultLayout";
import TopSongs from "../components/TopSongs";
import Twemoji from "../components/Twemoji";
import styles from "../styles/pages/About.module.css";

const About = (): JSX.Element => {
	return (
		<PageWithTitle title="About me!">
			<div>
				<h2 className="center">
					Hey again <Twemoji emoji="👋" />
				</h2>
				<div className={["center", styles.bio].join(" ")}>
					<p>
						I am a <Age timestamp={1090022400000 /* totaly not my bd 😳 */} /> year old developer from
						Poland.
					</p>
					<p>I love to create new things and watch anime.</p>
					<p>I started coding around 2019 when I went to High School.</p>
					<p>
						After falling in love with coding I started to find some online friends who also shared my
						interests and passion for it.
					</p>
					<p>
						I bought my first domain at the start of 2020 and then few months later bought this one which I
						use and love till this day.
					</p>
					<p>I am always ready to help others and enjoy it too!</p>
					<p>
						If you want to, you can contact me{" "}
						<Link href="/contact">
							<a className={styles.link}>here</a>
						</Link>
						.
					</p>
				</div>
				<hr />
				<div className="topsongs">
					<p className={["center", styles.topSongsTitle].join(" ")}>My top songs on Spotify:</p>
					<TopSongs />
				</div>
				<hr />
				<Badges />
			</div>
		</PageWithTitle>
	);
};

export default About;
