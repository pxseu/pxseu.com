import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import Twemoji from "../components/Twemoji";
import styles from "../styles/pages/Comment.module.css";

const Contact = (): JSX.Element => (
	<DefaultLayout title={"Contact / Socials"}>
		<p>Bellow are some socials you can find me on!</p>
		<p>
			<a className="link" href="mailto:contact.pxseu@gmail.com" target="_blank" rel="noreferrer">
				<Twemoji emoji="📧" /> Email
			</a>
		</p>
		<p>
			<a className="link" href="https://github.com/pxseu" target="_blank" rel="noreferrer">
				<Twemoji emoji="🌐" /> Github
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/pxseu" target="_blank" rel="noreferrer">
				<Twemoji emoji="🐦" /> Twitter
			</a>
		</p>
		<p>
			<a className="link" href="https://discord.com/users/338718840873811979" target="_blank" rel="noreferrer">
				<Twemoji emoji="📱" /> Discord
			</a>
		</p>
		<p>
			<a className="link" href="https://steamcommunity.com/id/pxseu/" target="_blank" rel="noreferrer">
				<Twemoji emoji="🎮" /> Steam
			</a>
		</p>
		<p>
			<a className="link" href="https://anilist.co/user/pxseu/" target="_blank" rel="noreferrer">
				<Twemoji emoji="📺" /> Anilist
			</a>
		</p>
		<p>
			<a
				className="link"
				href="https://open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79"
				target="_blank"
				rel="noreferrer">
				<Twemoji emoji="🎧" /> Spotify
			</a>
		</p>
		<p className={styles.comment}>
			<i>psst these are links!</i>
		</p>
	</DefaultLayout>
);

export default Contact;
