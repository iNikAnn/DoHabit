import styles from './ModalLayout.module.css';
import { useContext, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion'
import ModalHeader from './ModalHeader';
import { DirectionContext } from '@shared/lib/router';
import { variants } from '../model/modal.animations';

/**
 * Shared layout for all modal routes.
 */
function ModalLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const direction = useContext(DirectionContext);

	// Navigate one level up to close the modal view
	const handleClose = () => navigate(-1);

	// Store title in state to prevent losing it on re-renders
	const [modalTitle] = useState(location.state?.modalTitle ?? 'DoHabit');

	return (
		<motion.div
			className={styles.modal}
			custom={direction}
			variants={variants}
			initial='initial'
			animate="animate"
			exit='exit'
		>
			<ModalHeader
				title={modalTitle}
				onClose={handleClose}
			/>

			<div
				id='modalChildrenWrapper'
				className={styles.content}
			>
				<Outlet />
			</div>
		</motion.div>
	);
}

export { ModalLayout };