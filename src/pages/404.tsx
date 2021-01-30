import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultLayout from "../components/DefaultLayout";
import styles from "../styles/pages/Error.module.css";

const Custom404 = (): JSX.Element => {
	const router = useRouter();

	return (
		<DefaultLayout title={"404 | Not found"}>
			{router.pathname == router.asPath ? (
				<p>You&rsquo;re not funny</p>
			) : (
				<>
					<p>
						<code className={styles.codeBlock}>{router.asPath}</code>
					</p>
					<p>Is not on the server.</p>
				</>
			)}

			<p>
				<Link href="/">
					<button className={styles.buttonGoBack}>Go home</button>
				</Link>
			</p>
		</DefaultLayout>
	);
};

export default Custom404;
