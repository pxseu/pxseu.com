import React from "react";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head />
				<body>
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<p id="___nojs">UwU Please turn on javascript!<br />Thanks! -pxseu</p><style>#__next {display: none;}#___nojs {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 30px; text-align: center;}body {color: white; background-color: black; font-family: Arial, Helvetica, sans-serif;}</style>`,
						}}
					/>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
