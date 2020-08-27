import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ open, onClose, children }) => {
	if (!open) return null;
	const ModalText = children == undefined ? 'What?' : children;

	return ReactDom.createPortal(
		<>
			<div className='overlay' />
			<div id='modal' className='modal'>
				<div id='closeModal' className='closeModal' onClick={onClose}>
					x
				</div>
				{ModalText}
			</div>

			<style jsx>{`
				.modal {
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: #101010;
					color: black;
					padding: 50px;
					z-index: 1000;
					border-radius: 10px;
					border: 1px solid #ffffff;
					text-align: center;
				}

				.overlay {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.7);
					z-index: 1000;
				}

				.closeModal {
					position: absolute;
					top: 10px;
					right: 10px;
					font-family: Arial, sans-serif;
					cursor: pointer;
					font-weight: 300;
					font-size: 20px;
					background-color: rgba(255, 66, 66, 0.7);
					color: white;
					padding: 0px;
					width: 25px;
					height: 25px;
					text-align: center;
					transition-duration: 0.2s;
				}

				.closeModal:hover {
					background-color: #ff4242;
				}
			`}</style>
		</>,
		document.getElementById('portal')
	);
};

export default Modal;
