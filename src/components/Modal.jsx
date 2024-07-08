import styles from '../css/Modal.module.css';

// components
import Button from './Button';

// icons
import { FaPlusCircle } from "react-icons/fa";
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
				{/* <Button
					icon={<FaPlusCircle />}
					text="Close"
					bgColor="Gray"
					onClick={onClose}
				/> */}

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