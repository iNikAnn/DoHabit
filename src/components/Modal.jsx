import styles from '../css/Modal.module.css';

// framer
import { motion } from 'framer-motion'

// icons
import { IoIosArrowForward } from 'react-icons/io';

function Modal({ title, children, onClose }) {

	const modalVariants = {
		initial: { opacity: 0, x: '50%' },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: '50%' },
		transition: { duration: .2, ease: 'easeOut' }
	};

	const handleDragEnd = (_, info) => {
		if (info.offset.x >= 100) {
			onClose();
			navigator.vibrate?.(10);
		};
	};

	return (
		<motion.div
			{...modalVariants}
			className={styles.modal}
		>
			<header className={styles.header}>
				<IoIosArrowForward onClick={onClose} />

				<h2 className={styles.title}>
					{title}
				</h2>
			</header>

			<motion.div
				id="modalChildrenWrapper"
				className={styles.childrenWrapper}
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={{ left: 0.1, right: 1 }}
				onDragEnd={handleDragEnd}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

export default Modal;