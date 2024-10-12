import styles from '../css/Modal.module.css';

// framer
import { motion, useAnimate, useMotionValue } from 'framer-motion'

// icons
import { IoIosArrowForward } from 'react-icons/io';

function Modal({ title, children, onClose }) {
	const [scope, animate] = useAnimate();
	const x = useMotionValue(0);

	const modalVariants = {
		initial: { opacity: 0, x: '50%' },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: '50%' },
		transition: { duration: .3, ease: 'easeOut' }
	};

	const handleDragEnd = async () => {
		const startX = x.get();

		if (startX >= 50) {
			await animate(
				scope.current,
				{ opacity: [1, 0], x: [startX, startX + 100] },
				{ duration: .1, ease: 'easeOut' }
			);
			onClose();
			navigator.vibrate?.(10);
		};
	};

	return (
		<motion.div
			className={styles.modal}
			{...modalVariants}
		>
			<motion.header
				className={styles.header}
			>
				<IoIosArrowForward onClick={onClose} />

				<h2 className={styles.title}>
					{title}
				</h2>
			</motion.header>

			<motion.div
				id="modalChildrenWrapper"
				ref={scope}
				style={{ x }}
				className={styles.childrenWrapper}
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={{ left: 0.1, right: 0.5 }}
				onDragEnd={handleDragEnd}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

export default Modal;