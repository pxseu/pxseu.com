import React, { useState, useRef } from "react";
import DefaultLayout from "../../../components/DefaultLayout";
import Modal from "../../../components/Modal";

const MessageIndex = (): JSX.Element => {
	const [showSucces, setShowSucces] = useState(false);
	const [disabledButton, setDisabledButton] = useState(false);
	const [showSuccesMessage, setShowSuccesMessage] = useState("");
	const [isError, showError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const messageBox = useRef<HTMLInputElement>(null);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		setDisabledButton(true);
		messageBox.current?.blur();

		const url = `${window.location.protocol}//${window.location.host}/api/v2/sendMessage`;
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
				body: JSON.stringify({ message: messageBox.current?.value }),
			});

			parrsedResponse = await response.json();
		} catch (e) {
			setErrorMessage("Message not sent!\nMight be a network or server issue.");
			showError(true);
			setDisabledButton(false);
			return;
		}

		if (parrsedResponse.status != 200) {
			setErrorMessage(parrsedResponse.message);
			showError(true);
			setDisabledButton(false);
			return;
		}

		setShowSuccesMessage(parrsedResponse.message);
		setShowSucces(true);
		setDisabledButton(false);
	};

	return (
		<>
			<DefaultLayout title={"Message me!"}>
				<p>Once per minute tho</p>

				<div className="messageDiv">
					<form action="">
						<input
							type="text"
							name="messageInput"
							className="messageInput"
							id="messageInput"
							ref={messageBox}
						/>
						<button
							type="submit"
							onClick={sendMessage}
							className="messageButton"
							id="messageButton"
							disabled={disabledButton}>
							Send!
						</button>
					</form>
				</div>
			</DefaultLayout>
			<Modal
				open={showSucces}
				onClose={() => {
					setShowSucces(false);
					messageBox.current ? (messageBox.current.value = "") : null;
				}}>
				<p>Sent succesfull!</p>
				<p>Data: &rdquo;{showSuccesMessage}&rdquo;</p>
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
					color: white;
					background: none;
					padding: 10px;
					border-style: solid;
					border-color: white;
					border-width: 0.1rem;
					border-radius: 20px;
					cursor: pointer;
					transition-duration: 0.2s;
				}

				.messageButton:hover {
					color: black;
					background-color: white;
					border-color: black;
				}

				.messageButton:active {
					box-shadow: 0px 5px 3px white;
				}

				.messageButton:disabled {
					cursor: not-allowed;
				}
			`}</style>
		</>
	);
};

export default MessageIndex;
