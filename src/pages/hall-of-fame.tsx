import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import Twemoji from "../components/Twemoji";
import styles from "../styles/pages/Comment.module.css";

const HallOfFame = (): JSX.Element => (
	<DefaultLayout title={"Hall of fame"}>
		<p>
			<a className="link" href="https://twitter.com/rubinstagram" target="_blank" rel="noreferrer">
				Sylwia | gave her own opinion about this websites design <Twemoji emoji="💅" />
			</a>
		</p>
		<p>
			<a className="link" href="https://kawakaami.dev/" target="_blank" rel="noreferrer">
				kawakami | most marvelous girl in the world <Twemoji emoji="🥺" />
			</a>
		</p>
		<p>
			<a className="link" href="https://mev.pxseu.com" target="_blank" rel="noreferrer">
				Mev | co-founder of @booble-site <Twemoji emoji="🌐" />
			</a>
		</p>
		{/* If you see this i don't want to ask you because it's past you
		and yeah i don't want to make you unhappy
		<p>
			<a className="link" href="https://www.vektrix.cc" target="_blank" rel="noreferrer">
				Vek | told me about security.txt
			</a>
		</p> */}
		<p>
			<a className="link" href="https://twitter.com/Amuq16" target="_blank" rel="noreferrer">
				Amuq | DDOS&rsquo;ed my website <Twemoji emoji="💥" />
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/Apxllooo" target="_blank" rel="noreferrer">
				Apx | sent minecraft mods <Twemoji emoji="🛠" />
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/crash7_" target="_blank" rel="noreferrer">
				crash | przekonał mnie <Twemoji emoji="😳" />
			</a>
		</p>
		<p>
			<a className="link" href="https://twitter.com/milkeusz" target="_blank" rel="noreferrer">
				Milki | nothing special <Twemoji emoji="😎" />
			</a>
		</p>
		<p>
			<a className="link" href="https://jelnislaw.ml/" target="_blank" rel="noreferrer">
				JelNiSław | menel <Twemoji emoji="😁" />
			</a>
		</p>
		<p>
			<a className="link" href="https://ririxi.dev/" target="_blank" rel="noreferrer">
				ririxi | cute furry <Twemoji emoji="😍" />
			</a>
		</p>
		<p className={styles.comment}>
			<i>psst these are links!</i>
		</p>
	</DefaultLayout>
);

export default HallOfFame;
