import styles from './ModalLayout.module.css';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io';

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

	// Prevent layout jumps by resetting window scroll
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
				className={styles.childrenWrapper}
			>
				<Outlet />
			</motion.div>
		</motion.div>
	);
}

export { ModalLayout };