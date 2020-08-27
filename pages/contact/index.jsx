import Head from 'next/head';
import DefaultLayout from '../../components/DefaultLayout';

const Contact = () => (
	<DefaultLayout>
		<Head>
			<title>Contact / Socials</title>
			<meta
				data-n-head='ssr'
				data-hid='og:description'
				property='og:description'
				content='Contact / Socials'
			/>
		</Head>
		<h1 className='center noselect'>
			<a>Contact / Socials</a>
		</h1>
		<hr />
		<div className='center noselect'>
			<p>
				<a href='https://github.com/pxseu'>Github</a>
			</p>
			<p>
				<a href='https://twitter.com/pxseu'>Twitter</a>
			</p>
			<p>
				<a href='mailto:me@pxseu.com'>Email</a>
			</p>
			<p>
				<a href='https://discord.pxseu.com'>Discord</a>
			</p>
		</div>
	</DefaultLayout>
);

export default Contact;
