import styles from './ModalLayout.module.css';

// router
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// framer
import { motion, useAnimate, useMotionValue } from 'framer-motion'

// icons
import { IoIosArrowForward } from 'react-icons/io';

// variants
const modalVariants = {
	initial: { opacity: 0, x: '50%' },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: '10%' },
	transition: { duration: .2, ease: 'easeOut' }
};

/**
 * Shared layout for all modal routes.
 */
function ModalLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	// Navigate one level up to close the modal view
	const handleClose = () => navigate(-1);

	// Get title passed from Link state or fallback to app name
	const modalTitle = location.state?.modalTitle ?? 'DoHabit';

	const [scope, animate] = useAnimate();
	const x = useMotionValue(0);

	const handleDragEnd = async () => {
		const startX = x.get();

		if (startX >= 50) {
			await animate(
				scope.current,
				{ opacity: [1, 0], x: [startX, startX + 100] },
				{ duration: .1, ease: 'easeOut' }
			);
			handleClose();
			navigator.vibrate?.(10);
		};
	};

	return (
		<motion.div
			className={styles.modal}
			{...modalVariants}
		>
			<motion.header className={styles.header}>
				<IoIosArrowForward onClick={handleClose} />

				<h2 className={styles.modalTitle}>
					{modalTitle}
				</h2>
			</motion.header>

			<motion.div
				id='modalChildrenWrapper'
				ref={scope}
				style={{ x }}
				className={styles.childrenWrapper}
				drag='x'
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={{ left: 0.1, right: 0.5 }}
				onDragEnd={handleDragEnd}
			>
				<Outlet />
			</motion.div>
		</motion.div>
	);
}

export { ModalLayout };