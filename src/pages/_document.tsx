import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<>
				<Html lang="en">
					<Head />
					{<html dangerouslySetInnerHTML={{ __html: "<!-- uwu -->" }}></html>}
					<body>
						{
							<noscript
								dangerouslySetInnerHTML={{
									__html: `<p id="___nojs">UwU Please turn on javascript!<br />Thanks! -pxseu</p>
								<style>
									#__next {display: none;}
									#___nojs {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 30px; text-align: center;}
									body {color: white; background-color: black; font-family: Arial, Helvetica, sans-serif;}
								</style>`,
								}}></noscript>
						}
						<Main />
						<NextScript />
					</body>
				</Html>
			</>
		);
	}
}

export default MyDocument;
