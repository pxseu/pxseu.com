import Head from 'next/head';
import DefaultLayout from '../../components/DefaultLayout';
import Modal from '../../components/Modal';
import { useState } from 'react';

const About = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DefaultLayout>
			<Head>
				<title>About Me</title>
				<meta
					data-n-head='ssr'
					data-hid='og:description'
					property='og:description'
					content='About me.'
				/>
			</Head>
			<h1 className='center noselect'>
				<a>About Me</a>
			</h1>
			<hr />
			<div className='center noselect'>
				<p>Web and Back End developer.</p>
				<p>Javascript lover.</p>
				<p>Always up for a new challange.</p>
				<p>16 years old.</p>
				<p>I like anime and manga (and color pink uwu).</p>
				<p>
					I love my cute and amazing girlfriend. (
					<a onClick={() => setIsOpen(true)}>Peitho</a>)
				</p>
				<p>I use these languages:</p>
				<p>C++, C#, TS, JS, Python</p>
				<p>I have experience with:</p>
				<p>
					Next.js, React, Express, MongoDB, Discord.js, EJS, Passport, Browser
					Extensions, Cross Platform Apps
				</p>
				<p>Currently learning / getting better with:</p>
				<p>React and Next.js with Express</p>
			</div>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<p>
					<a href='https://julie420.github.io'>Her website is here.</a>
				</p>
				<p>She is vewwy smort~!!!</p>
			</Modal>
		</DefaultLayout>
	);
};

export default About;

/* 
			Peitho is hot af and i love her a lot omfg
*/
