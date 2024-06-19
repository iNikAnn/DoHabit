import styles from '../css/Modal.module.css';

// components
import Button from './Button';

// icons
import { FaPlusCircle } from "react-icons/fa";

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

				<Button
					icon={<FaPlusCircle />}
					text="Close"
					bgColor="Gray"
					onClick={onClose}
				/>
			</div>

			<div className={styles.childrenWrapper}>
				{children}
			</div>
		</div>
	);
}

export default Modal;