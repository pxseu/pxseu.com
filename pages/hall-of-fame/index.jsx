import Head from "next/head";
import DefaultLayout from "../../components/DefaultLayout";

const HallOfFame = () => (
	<DefaultLayout>
		<Head>
			<title>Hall of fame</title>
			<meta
				data-n-head='ssr'
				data-hid='og:description'
				property='og:description'
				content='Hall of fame'
			/>
		</Head>
		<h1 className='center noselect'>
			<a>These people helped with the creation of the website</a>
		</h1>
		<hr />
		<div className='center noselect'>
			<p>Peitho | spell checking and langauge corrections</p>
			<p>Vek | told me about security.txt</p>
			<p>Milki | told me to remove Peitho</p>
			<p>Amuq | DDOS'ed my website</p>
		</div>
	</DefaultLayout>
);

export default HallOfFame;
