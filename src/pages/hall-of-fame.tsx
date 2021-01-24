import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import styles from "../styles/pages/Comment.module.css";

const HallOfFame = (): JSX.Element => (
	<DefaultLayout title={"Hall of fame"}>
		<p>
			<a className="link" href="https://www.vektrix.cc" target="_blank" rel="noreferrer">
				Vek | told me about security.txt
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/milkeusz" target="_blank" rel="noreferrer">
				Milki | nothing tbh
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/rubinstagram" target="_blank" rel="noreferrer">
				Sylwia | gave her own opinion about this websites design
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/Amuq16" target="_blank" rel="noreferrer">
				Amuq | DDOS&rsquo;ed my website
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/Apxllooo" target="_blank" rel="noreferrer">
				Apx | sent minecraft mods
			</a>
		</p>
		<p>
			<a className="link" href="https://jelnislaw.ml/" target="_blank" rel="noreferrer">
				JelNiSław | menel
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/crash7_" target="_blank" rel="noreferrer">
				crash | przekonał mnie
			</a>
		</p>
		<p>
			<a className="link" href="https://mev.pxseu.com" target="_blank" rel="noreferrer">
				Mev | co-founder of @booble-site
			</a>
		</p>
		<p>
			<a className="link" href="https://RedBird16.com" target="_blank" rel="noreferrer">
				Red_Prez16 | coder @ RedBird16.com
			</a>
		</p>
		<p>
			<a className="link" href="https://ririxi.dev/" target="_blank" rel="noreferrer">
				ririxi | cute furry
			</a>
		</p>
		<p className={styles.comment}>
			<i>psst these are links!</i>
		</p>
	</DefaultLayout>
);

export default HallOfFame;
