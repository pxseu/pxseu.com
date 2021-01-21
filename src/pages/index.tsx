import React from "react";
import Link from "next/link";
import Logo from "../components/LogoTxt"
import IndexpageLayout from "../components/IndexpageLayout";
import styles from "../styles/pages/IndexPage.module.css";

const Index = (): JSX.Element => (
	<IndexpageLayout>
		<div className={styles.logo}>
			<Logo />
		</div>

		<main className={styles.links}>
			<p className={styles.linksParent}>
				<Link href="/about">
					<a className={`${styles.link} noselect`}>About Me</a>
				</Link>
			</p>
			<p className={styles.linksParent}>
				<Link href="/projects">
					<a className={`${styles.link} noselect`}>My Projects</a>
				</Link>
			</p>
			<p className={styles.linksParent}>
				<a className={`${styles.link} noselect`} href="https://discord.pxseu.com">
					Discord Server
				</a>
			</p>
		</main>
	</IndexpageLayout>
);

export default Index;
