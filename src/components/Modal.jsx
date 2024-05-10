import styles from '../css/Modal.module.css';

function Modal(props) {
	const {
		// 'on' functions
		onClose,

		children
	} = props;

	return (
		<div className={styles.modal}>
			Modal
			<button onClick={onClose}>close</button>
			{children}
		</div>
	);
}

export default Modal;