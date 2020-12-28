import Link from "next/link";
import { useRouter } from "next/router";
import DefaultLayout from "../components/DefaultLayout";

const Custom404 = () => {
	const router = useRouter();

	return (
		<>
			<DefaultLayout title={"404 | Not found"}>
				{router.pathname == router.asPath ? (
					<p>You're not funny</p>
				) : (
					<>
						<p>
							<code className="pathUrl">{router.asPath}</code>
						</p>
						<p>Is not on the server.</p>
					</>
				)}

				<p>
					<Link href="/">
						<button className="buttonNotFound">Go home</button>
					</Link>
				</p>
			</DefaultLayout>
			<style jsx>{`
				.pathUrl {
					display: block;
					white-space: pre-wrap;
					background-color: #303030;
					padding: 0.5rem;
					border-radius: 0.5rem;
					word-wrap: break-word;
				}

				.buttonNotFound {
					position: relative;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					padding: 1rem 1.5rem;
					color: white;
					cursor: pointer;
					outline: none;
					border-radius: 100px;
					border: 2px solid white;
					background: none;
					transition-duration: 0.2s;
					font-size: 16px;
				}

				.buttonNotFound:hover {
					color: black;
					border: 2px solid black;
					background-color: white;
				}
			`}</style>
		</>
	);
};

export default Custom404;
