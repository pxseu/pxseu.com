import React, { useState, useRef } from "react";
import Head from "next/head";
import DefaultLayout from "../../../components/DefaultLayout";
import Modal from "../../../components/Modal";

const MessageIndex = () => {
	const [showSucces, setShowSucces] = useState(false);
	const [showSuccesMessage, setShowSuccesMessage] = useState("");
	const [isError, showError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const messageBox = useRef(null);

	const sendMessage = async (e) => {
		e.preventDefault();

		messageBox.current.blur();

		const url = `${window.location.protocol}//${window.location.host}/api/v1/sendMessage`;
		let parrsedResponse;

		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify({ content: messageBox.current.value }),
			});

			parrsedResponse = await response.json();
		} catch (e) {
			setErrorMessage(
				"Message not sent!\nMight be a network or server issue.",
			);
			showError(true);
			return;
		}

		if (parrsedResponse.error) {
			setErrorMessage(parrsedResponse.error);
			showError(true);
			return;
		}

		setShowSuccesMessage(parrsedResponse.content);
		setShowSucces(true);
	};

	return (
		<>
			<DefaultLayout>
				<Head>
					<title>Message me!</title>
					<meta
						data-n-head='ssr'
						data-hid='og:description'
						property='og:description'
						content='Message me!'
					/>
				</Head>

				<h1 className='center noselect'>
					<a>Message me!</a>
				</h1>
				<p className='center noselect'>Once per minute tho</p>
				<hr />
				<div className='messageDiv'>
					<form action=''>
						<input
							type='text'
							name='messageInput'
							className='messageInput'
							id='messageInput'
						/>
						<button
							type='submit'
							onClick={(e) => sendMessage(e)}
							className='messageButton'
							id='messageButton'>
							Send!
						</button>
					</form>
				</div>
			</DefaultLayout>
			<Modal
				open={showSucces}
				onClose={() => {
					setShowSucces(false);
					messageBox.current.value = "";
				}}>
				<p>Sent succesfull!</p>
				<p>Data: "{showSuccesMessage}"</p>
			</Modal>

			<Modal open={isError} onClose={() => showError(false)}>
				<p>Error!</p>
				<p>{errorMessage}</p>
			</Modal>

			<style jsx>{`
				.messageDiv input:focus,
				.messageDiv button:focus {
					outline: none;
				}

				.messageInput {
					position: relative;
					margin: 0;
					margin-top: 20px;
					margin-left: 10px;
					height: calc(80% - 10);
					transform: translate(0, -50%);
					padding: 0;
					border: none;
					width: calc(100% - 150px);
					font-size: 17px;
					background-color: #dcdcdc;
					color: black;
					border-radius: 20px;
					padding: 10px;
				}

				.messageButton {
					position: relative;
					margin: 0;
					margin-top: 20px;
					margin-left: 8px;
					height: calc(80% - 10);
					transform: translate(0, -50%);
					width: 100px;
					padding: 0;
					border: none;
					font-size: 17px;
					background-color: #dcdcdc;
					color: black;
					padding: 10px;
					border-radius: 20px;
				}
			`}</style>
		</>
	);
};

export default MessageIndex;
