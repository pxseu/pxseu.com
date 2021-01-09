import React, { useEffect, useRef, memo, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/components/Modal.module.css";

const Modal = ({
	open,
	onClose,
	children,
}: {
	open: boolean;
	onClose: () => void | Promise<void>;
	children: ReactNode;
}) => {
	if (!open) return null;
	const ModalText = children == undefined ? "What?" : children;
	const modalEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setTimeout(() => modalEl.current?.classList.remove(styles.fade), 100);
	});

	return createPortal(
		<>
			<div id="overlay" className={styles.overlay} />
			<div id="modal" className={`${styles.modal} ${styles.fade} noselect`} ref={modalEl}>
				<div
					id="closeModal"
					className={styles.closeModal}
					onClick={() => {
						modalEl.current?.classList.add(styles.fade);
						setTimeout(() => onClose(), 400);
					}}>
					x
				</div>
				{ModalText}
			</div>
		</>,
		document.getElementById("portal") ?? document.body
	);
};

export default memo(Modal);
