import React from "react";
import styles from "../styles/pages/IndexPage.module.css";
import NowPlaying from "../components/NowPlaying";
import DefaultLayout from "../components/DefaultLayout";
import Link from "next/link";

const Index = (): JSX.Element => {
	return (
		<DefaultLayout>
			<h2 className="center">
				Hi, I{"'"}m{" "}
				<span className={styles.username}>
					<span className={styles.usernameColor}>pxseu</span>!
				</span>
			</h2>

			<p className="center">Nice to see you here!</p>

			<div className="center">
				<p>Spotify status:</p>
				<NowPlaying />
			</div>

			<div className={styles.links}>
				<Link href="/contact">
					<button className={styles.link}>Contact me</button>
				</Link>
				<Link href="/about">
					<button className={styles.link}>Read more about me</button>
				</Link>
				<Link href="/projects">
					<button className={styles.link}>My projects</button>
				</Link>
			</div>
		</DefaultLayout>
	);
};

export default Index;
