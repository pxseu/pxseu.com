import Link from "next/link";
import DefaultLayout from "../../components/DefaultLayout";

const OtherIndex = () => (
	<>
		<DefaultLayout title={"Other stuff"}>
			<p>
				<Link href='/other/yiff'>
					<a>Yiff</a>
				</Link>
			</p>

			<p>
				<Link href='/other/waifu'>
					<a>Waifu</a>
				</Link>
			</p>

			<p>
				<Link href='/other/message'>
					<a>Message me!</a>
				</Link>
			</p>

			<p>
				<Link href='/hall-of-fame'>
					<a>Hall Of Fame</a>
				</Link>
			</p>
		</DefaultLayout>
		<style jsx>{`
			.mainButtons p {
				font-size: 25px;
			}
		`}</style>
	</>
);

export default OtherIndex;
