import styles from './ModalLayout.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDragAction } from '@shared/lib';
import { motion } from 'framer-motion'
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

	const { scope, motionValue: x, handleDragEnd } = useDragAction({
		successAnimation: {
			opacity: 0,
			x: window.innerWidth / 2
		},
		onAction: () => {
			handleClose();
			navigator?.vibrate?.(10);
		}
	});

	return (
		<motion.div
			className={styles.modal}
			{...modalVariants}
		>
			<motion.header className={styles.header}>
				<IoIosArrowForward onClick={handleClose} />

				<h1 className={styles.modalTitle}>
					{modalTitle}
				</h1>
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