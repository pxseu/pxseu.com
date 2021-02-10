import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import Twemoji from "../components/Twemoji";
import styles from "../styles/pages/Comment.module.css";

const Spacer = (): JSX.Element => <span className={styles.spacer}>|</span>;

interface PersonInHofProps {
	url: string;
	person: string;
	desc: string;
	emoji?: string;
}

const PersonInHof = ({ url, person, desc, emoji }: PersonInHofProps): JSX.Element => (
	<p>
		<a className="link" href={url} target="_blank" rel="noreferrer">
			{person} <Spacer /> {desc} {emoji && <Twemoji emoji={emoji} />}
		</a>
	</p>
);

const HallOfFame = (): JSX.Element => (
	<DefaultLayout title={"Hall of fame"}>
		<PersonInHof
			person="Sylwia"
			desc="gave her own opinion about this websites design"
			url="https://twitter.com/rubinstagram"
			emoji="💅"
		/>
		<PersonInHof
			person="kawakami"
			desc="most marvelous girl in the world"
			url="https://kawakaami.dev/"
			emoji="🥺"
		/>
		<PersonInHof
			person="narpi"
			desc="amazing Minecraft plugin developer"
			url="https://web.archive.org/web/20191010183438/https://narpi.me/"
			emoji="🎮"
		/>
		<PersonInHof person="naomi" desc="amazing coder and my cutie" url="https://kawakaami.dev/" emoji="❤" />
		<PersonInHof person="Mev" desc="co-founder of @booble-site" url="https://mev.pxseu.com" emoji="🌐" />
		{/* If you see this i don't want to ask you because it's past you
		and yeah i don't want to make you unhappy 
		<PersonInHof person="Vek" desc="told me about security.txt" url="https://www.vektrix.cc" emoji="🔐" /> */}
		<PersonInHof person="amuq" desc="DDOS'ed my website" url="https://twitter.com/Amuq16" emoji="💥" />
		<PersonInHof person="Apx" desc="sent Minecraft mods" url="https://twitter.com/Apxllooo" emoji="🛠" />
		<PersonInHof person="milki" desc="my little pogchamp" url="https://twitter.com/milkeusz" emoji="💗" />
		<PersonInHof person="crash" desc="przekonał mnie" url="https://twitter.com/crash7_" emoji="😳" />
		<PersonInHof person="JelNiSław" desc="menel" url="https://jelnislaw.ml/" emoji="😁" />
		<PersonInHof person="ririxi" desc="cute furry" url="https://ririxi.dev/" emoji="😍" />
		<p className={styles.comment}>
			<i>psst these are links!</i>
		</p>
	</DefaultLayout>
);

export default HallOfFame;
