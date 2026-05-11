import styles from './ModalLayout.module.css';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';
import { useDragAction } from '@shared/lib';

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

	// Store title in state to prevent losing it on re-renders
	const [modalTitle] = useState(location.state?.modalTitle ?? 'DoHabit');

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

	/**
	 * Prevent layout jumps by resetting window scroll.
	 */
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<motion.div
			className={styles.modal}
			{...modalVariants}
			layoutRoot
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
			/**
			* Temporarily disabled custom drag-to-close to avoid UI bugs.
			* Relying on native Android back-swipe gestures for now.
			*/
			// drag='x'
			// dragConstraints={{ left: 0, right: 0 }}
			// dragElastic={{ left: 0.1, right: 0.5 }}
			// onDragEnd={handleDragEnd}
			>
				<Outlet />
			</motion.div>
		</motion.div>
	);
}

export { ModalLayout };