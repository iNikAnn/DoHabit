import styles from '../css/Modal.module.css';

function Modal(props) {
	const {
		title,

		// 'on' functions
		onClose,

		children
	} = props;

	return (
		<div className={styles.modal}>
			<div className={styles.header}>
				<h2>{title}</h2>

				<button
					className={styles.closeBtn}
					onClick={onClose}
				>
					Cancel
				</button>
			</div>

			<div className={styles.childrenWrapper}>
				{children}
			</div>
		</div>
	);
}

export default Modal;