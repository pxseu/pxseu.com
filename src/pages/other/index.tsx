import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../../components/DefaultLayout";

const OtherIndex = () => (
	<>
		<Head>
			<title>Other stuff.</title>
			<meta
				data-n-head='ssr'
				data-hid='og:description'
				property='og:description'
				content='Other stuff.'
			/>
		</Head>
		<DefaultLayout>
			<h1 className='center noselect'>
				<a>Other stuff</a>
			</h1>
			<hr />
			<div className='mainButtons center noselect'>
				<Link href='/other/yiff'>
					<p>
						<a>Yiff</a>
					</p>
				</Link>
				<Link href='/other/waifu'>
					<p>
						<a>Waifu</a>
					</p>
				</Link>
				<Link href='/other/message'>
					<p>
						<a>Message me!</a>
					</p>
				</Link>
				<Link href='/hall-of-fame'>
					<p>
						<a>Hall Of Fame</a>
					</p>
				</Link>
			</div>
		</DefaultLayout>
		<style jsx>{`
			.mainButtons p {
				font-size: 25px;
			}
		`}</style>
	</>
);

export default OtherIndex;
