import Head from "next/head";
import { useState } from "react";
import DefaultLayout from "../../../components/DefaultLayout";

const LovesIndex = () => {
	const [loveClick, setLoveClick] = useState(false);

	return (
		<>
			<DefaultLayout>
				<Head>
					<title>I love you &lt;333</title>
					<meta
						data-n-head='ssr'
						data-hid='og:description'
						property='og:description'
						content='I love you cutie <333'
					/>
				</Head>
				<h1 className='center noselect'>
					<a onClick={() => setLoveClick(true)}>I love you cutie &lt;333</a>
				</h1>
				<hr />
				<div className={loveClick ? "center noselect imageDiv" : "hidden"}>
					<img src='https://cdn.pxseu.com/meAndHer.jpg?raw' />
				</div>
			</DefaultLayout>
			<style jsx>{`
				.imageDiv {
					overflow: hidden;
				}
			`}</style>
		</>
	);
};

export default LovesIndex;
