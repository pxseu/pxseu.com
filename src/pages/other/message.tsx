import React, { useState, useRef } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Modal from "../../components/Modal";
import styles from "../../styles/pages/Message.module.css";
import buttonStyles from "../../styles/pages/Error.module.css";

const MessageIndex = (): JSX.Element => {
	const [showSucces, setShowSucces] = useState(false);
	const [disabledButton, setDisabledButton] = useState(false);
	const [isError, showError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const messageInput = useRef<HTMLTextAreaElement>(null);
	const nameInput = useRef<HTMLInputElement>(null);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		setDisabledButton(true);
		messageInput.current?.blur();

		// always go with https
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
				body: JSON.stringify({ message: messageInput.current?.value, name: nameInput.current?.value }),
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

		setShowSucces(true);
		setDisabledButton(false);
	};

	return (
		<>
			<DefaultLayout title={"Message me!"}>
				<p>Say as much dumb shit you can ty {"<3"}</p>
				<div className={styles.formWrapper}>
					<div className={styles.textAreaWrapper}>
						<p>Name: (optional)</p>
						<input
							name="messageInput"
							className={[styles.messageInput, styles.nameInput].join(" ")}
							ref={nameInput}
							placeholder='e.g. "Peitho"'
						/>
					</div>
					<div className={styles.textAreaWrapper}>
						<p>Content:</p>
						<textarea
							name="messageInput"
							className={styles.messageInput}
							ref={messageInput}
							placeholder='e.g. "drain gang"'
						/>
					</div>
					<div className={styles.buttonWrapper}>
						<button onClick={sendMessage} className={buttonStyles.buttonGoBack} disabled={disabledButton}>
							Send!
						</button>
					</div>
				</div>
			</DefaultLayout>
			<Modal
				open={showSucces}
				onClose={() => {
					setShowSucces(false);
					messageInput.current ? (messageInput.current.value = "") : null;
				}}>
				<p>Message was sent!</p>
			</Modal>

			<Modal open={isError} onClose={() => showError(false)}>
				<p>Error!</p>
				<p>{errorMessage}</p>
			</Modal>
		</>
	);
};

export default MessageIndex;
