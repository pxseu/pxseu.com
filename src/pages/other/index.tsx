import React from "react";
import Link from "next/link";
import DefaultLayout from "../../components/DefaultLayout";
import styles from "../../styles/pages/Comment.module.css";

const OtherIndex = (): JSX.Element => (
	<DefaultLayout title={"Other stuff"}>
		<p>Bunch of stuff to long to fit on the Navbar</p>
		<p>
			<Link href="/other/yiff">
				<a className="link">Yiff</a>
			</Link>
		</p>

		<p>
			<Link href="/other/waifu">
				<a className="link">Waifu</a>
			</Link>
		</p>

		<p>
			<Link href="/other/message">
				<a className="link">Message me!</a>
			</Link>
		</p>

		<p>
			<Link href="/hall-of-fame">
				<a className="link">Hall Of Fame</a>
			</Link>
		</p>
		<Link href="/other/legal-stuff">
			<a className="link">Legal Stuff</a>
		</Link>
		<p className={styles.comment}>
			<i>psst these are links!</i>
		</p>
	</DefaultLayout>
);

export default OtherIndex;
