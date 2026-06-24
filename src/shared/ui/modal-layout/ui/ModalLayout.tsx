import styles from './ModalLayout.module.css';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { motion } from 'framer-motion'
import ModalHeader from './ModalHeader';
import { DirectionContext, useInitialRouteState } from '@shared/lib/router';
import { modalMotionProps } from '../model/modal.animations';

/**
 * Shared layout for all modal routes.
 */
function ModalLayout() {
	const navigate = useNavigate();
	const direction = useContext(DirectionContext);
	const { modalTitle } = useInitialRouteState();

	// Navigate one level up to close the modal view
	const handleClose = () => navigate(-1);

	return (
		<motion.div
			className={styles.modal}
			custom={direction}
			{...modalMotionProps}
		>
			<ModalHeader
				title={modalTitle ?? 'DoHabit'} // eslint-disable-line
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