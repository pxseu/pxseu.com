import React, { useEffect, useRef, memo, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/components/Modal.module.css";

interface ModalInteraface {
	open: boolean;
	title: string;
	onClose: () => void | Promise<void>;
	children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalInteraface) => {
	if (!open) return null;
	const ModalText = children == undefined ? "What?" : children;
	const modalEl = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timeOut = setTimeout(() => modalEl.current?.classList.remove(styles.fade), 100);

		document.addEventListener("keydown", handleEscape);

		return () => {
			clearTimeout(timeOut);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	function handleEscape(e: KeyboardEvent): void {
		if (e.key === "Escape" || e.key === "Esc") {
			close();
		}
	}

	function close() {
		modalEl.current?.classList.add(styles.fade);
		setTimeout(() => onClose(), 400);
	}

	return createPortal(
		<>
			<div id="overlay" className={styles.overlay} onClick={() => close()} />
			<div id="modal" className={`${styles.modal} ${styles.fade} noselect`} ref={modalEl}>
				<div id="closeModal" className={styles.closeModal} onClick={() => close()}></div>
				<div
					id="modalQuestion"
					className={styles.modalQuestion}
					onClick={() => {
						if (window?.location?.href)
							window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
					}}></div>
				<div className={styles.modalContent}>{ModalText}</div>
			</div>
		</>,
		document.getElementById("portal") ?? document.body
	);
};

export default memo(Modal);
