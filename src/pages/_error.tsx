import { NextPage } from "next";
import { ErrorProps } from "next/error";
import Link from "next/link";
import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import styles from "../styles/pages/Error.module.css";
import CustomNotFound from "./404";

const Error: NextPage<ErrorProps> = ({ statusCode }: ErrorProps) => {
	if (statusCode == 404) {
		return <CustomNotFound />;
	}

	return (
		<DefaultLayout title={`${statusCode} | There was an error.`}>
			<>
				<p>
					<code className={styles.codeBlock}>{`${statusCode} | There was an error.`}</code>
				</p>
			</>

			<p>
				<Link href="/">
					<button className={styles.buttonGoBack}>Go home</button>
				</Link>
			</p>
		</DefaultLayout>
	);
};

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res
		? res.statusCode == 200
			? (() => {
					res.statusCode = 404;
					return 404;
			  })()
			: res.statusCode
		: err
		? err.statusCode ?? 500
		: 404;

	return { statusCode };
};

export default Error;
