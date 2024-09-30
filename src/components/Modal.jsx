import styles from '../css/Modal.module.css';

// framer
import { motion } from 'framer-motion'

// icons
import { IoIosArrowForward } from 'react-icons/io';

function Modal(props) {
	const {
		title,

		// 'on' functions
		onClose,

		children
	} = props;

	// --- Animation parameters ---
	const modalVariants = {
		initial: { opacity: 0, x: '50%' },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: '50%' },
		transition: { duration: .2 }
	};
	//

	return (
		<motion.div
			{...modalVariants}
			className={styles.modal}
		>
			<div className={styles.header}>
				<IoIosArrowForward onClick={onClose} />

				<h2 className={styles.title}>
					{title}
				</h2>
			</div>

			<div
				id="modalChildrenWrapper"
				className={styles.childrenWrapper}
			>
				{children}
			</div>
		</motion.div>
	);
}

export default Modal;