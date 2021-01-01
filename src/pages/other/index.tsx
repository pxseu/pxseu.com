import React from "react";
import Link from "next/link";
import DefaultLayout from "../../components/DefaultLayout";

const OtherIndex = (): JSX.Element => (
	<>
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
			<p className="comment">
				<i>psst these are links!</i>
			</p>
		</DefaultLayout>
		<style jsx>{`
			.mainButtons p {
				font-size: 25px;
			}

			.comment {
				color: #fff;
				text-decoration: underline #ffa9ff;
				transition-duration: 0.3s;
			}
			.comment:hover {
				color: #ffa9ff;
				text-decoration: underline #fff;
			}
		`}</style>
	</>
);

export default OtherIndex;
