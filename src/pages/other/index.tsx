import Link from "next/link";
import DefaultLayout from "../../components/DefaultLayout";

const OtherIndex = () => (
	<>
		<DefaultLayout title={"Other stuff"}>
			<p>Bunch of stuff to long to fit on the Navbar</p>
			<p>
				<Link href="/other/yiff">
					<a>Yiff</a>
				</Link>
			</p>

			<p>
				<Link href="/other/waifu">
					<a>Waifu</a>
				</Link>
			</p>

			<p>
				<Link href="/other/message">
					<a>Message me!</a>
				</Link>
			</p>

			<p>
				<Link href="/hall-of-fame">
					<a>Hall Of Fame</a>
				</Link>
			</p>
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
