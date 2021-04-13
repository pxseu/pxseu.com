import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Modal from "../components/Modal";
import buttonStyles from "../styles/pages/Error.module.css";
import styles from "../styles/pages/Message.module.css";

const NAME_KEY = "sendMessage:name";

const MessageIndex = (): JSX.Element => {
	const [isError, setIsError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [disabledButton, setDisabledButton] = useState(false);

	const [messageContent, setMessage] = useState("");

	const nameInput = useRef<HTMLInputElement>(null);
	const messageInput = useRef<HTMLTextAreaElement>(null);
	const attachmentInput = useRef<HTMLInputElement>(null);

	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		setDisabledButton(true);
		setIsError(false);

		const name = nameInput.current?.value ?? null;
		const message = messageInput.current?.value ?? null;
		const attachment = attachmentInput.current?.value ?? null;

		if (name && localStorage) localStorage.setItem(NAME_KEY, name);

		messageInput.current?.blur();

		// always go with https

		let parrsedResponse: {
			success?: boolean;
			message?: string;
		} = {};

		try {
			const response = await fetch("/api/v2/sendMessage", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify({
					message,
					name,
					attachment,
				}),
			});

			parrsedResponse = await response.json();
		} catch (e) {
			setMessage("Message not sent!\nMight be a network or server issue.");
			setIsError(true);
		}

		if (!parrsedResponse.success) {
			setIsError(true);
		}

		if (parrsedResponse.message) {
			setMessage(parrsedResponse.message);
		}

		setShowModal(true);
		setDisabledButton(false);
	};

	useEffect(() => {
		if (nameInput.current && localStorage) nameInput.current.value = localStorage.getItem(NAME_KEY) ?? "";
	}, []);

	return (
		<>
			<DefaultLayout title={"Message me!"}>
				<div className={["center", styles.formWrapper].join(" ")}>
					<div className={styles.textAreaWrapper}>
						<label className={styles.labelStyle}>Name: (optional)</label>
						<input
							name="nameInput"
							className={[styles.messageInput, styles.nameInput].join(" ")}
							ref={nameInput}
							placeholder='e.g. "dababy"'
						/>
					</div>
					<div className={styles.textAreaWrapper}>
						<label className={styles.labelStyle}>Content:</label>
						<textarea
							name="messageInput"
							className={styles.messageInput}
							ref={messageInput}
							placeholder='e.g. "drain gang"'
						/>
					</div>
					<div className={styles.textAreaWrapper}>
						<label className={styles.labelStyle}>Attachment:</label>
						<input
							name="attachmentInput"
							type="url"
							className={[styles.messageInput, styles.nameInput].join(" ")}
							ref={attachmentInput}
							placeholder='e.g. "https://cdn.pxseu.com/btXqULXS9.jpg"'
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
				open={showModal}
				onClose={() => {
					setShowModal(false);

					if (messageInput.current) messageInput.current.value = "";
					if (attachmentInput.current) attachmentInput.current.value = "";
				}}>
				{isError && <p>Error!</p>}
				<p>{messageContent}</p>
			</Modal>
		</>
	);
};

export default MessageIndex;
