import styles from '../css/Modal.module.css';

// icons
import { IoIosArrowForward } from "react-icons/io";

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
				<IoIosArrowForward onClick={onClose} />

				<h2 className={styles.title}>
					{title}
				</h2>
			</div>

			<div className={styles.childrenWrapper}>
				{children}
			</div>
		</div>
	);
}

export default Modal;