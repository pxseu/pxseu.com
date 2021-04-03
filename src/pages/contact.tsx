import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import styles from "../styles/pages/Contact.module.css";
import stylesComment from "../styles/pages/Comment.module.css";
import { StyledLink } from "../components/LinkText";

const Contact = (): JSX.Element => (
	<DefaultLayout title={"Contact / Socials"}>
		<div className="center">
			<h3>Bellow are some places you can find me on!</h3>

			<div className={styles.contactPlaces}>
				<StyledLink emoji="📧" href="mailto:contact.pxseu@gmail.com">
					Email
				</StyledLink>
				<StyledLink emoji="🌐" href="//github.com/pxseu">
					Github
				</StyledLink>
				<StyledLink emoji="🐦" href="//twitter.com/pxseu">
					Twitter
				</StyledLink>
				<StyledLink emoji="📱" href="//discord.com/users/338718840873811979">
					Discord
				</StyledLink>

				<StyledLink emoji="🎮" href="//steamcommunity.com/id/pxseu">
					Steam
				</StyledLink>

				<StyledLink emoji="📺" href="//anilist.co/user/pxseu">
					Anilist
				</StyledLink>
				<StyledLink emoji="🎧" href="//open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79">
					Spotify
				</StyledLink>
				<StyledLink emoji="🟡" href="//osu.ppy.sh/users/10164002">
					osu!
				</StyledLink>
			</div>

			<p className={stylesComment.comment}>
				<i>psst these are links!</i>
			</p>
		</div>
	</DefaultLayout>
);

export default Contact;
