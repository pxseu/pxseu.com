import React, { useState, useRef } from "react";
import DefaultLayout from "../../../components/DefaultLayout";
import Modal from "../../../components/Modal";

const MessageIndex = () => {
	const [showSucces, setShowSucces] = useState(false);
	const [showSuccesMessage, setShowSuccesMessage] = useState("");
	const [isError, showError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const messageBox = useRef(((<input />) as unknown) as HTMLInputElement);

	const sendMessage = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();

		messageBox.current.blur();

		const url = `${window.location.protocol}//${window.location.host}/api/v1/sendMessage`;
		let parrsedResponse: {
			status: number;
			message: string;
		};

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
				body: JSON.stringify({ message: messageBox.current.value }),
			});

			parrsedResponse = await response.json();
		} catch (e) {
			setErrorMessage(
				"Message not sent!\nMight be a network or server issue.",
			);
			showError(true);
			return;
		}

		if (parrsedResponse.status != 200) {
			setErrorMessage(parrsedResponse.message);
			showError(true);
			return;
		}

		setShowSuccesMessage(parrsedResponse.message);
		setShowSucces(true);
	};

	return (
		<>
			<DefaultLayout title={"Message me!"}>
				<p>Once per minute tho</p>

				<div className='messageDiv'>
					<form action=''>
						<input
							type='text'
							name='messageInput'
							className='messageInput'
							id='messageInput'
							ref={messageBox}
						/>
						<button
							type='submit'
							onClick={sendMessage}
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
