import styles from './Overlay.module.css';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .2 }
};

interface Props {
	onClick: (...args: any) => void;
}

/**
 * Global backdrop for modals, drawers...
 * Locks body scroll on mount and restores it on unmount.
 */
function Overlay({ onClick }: Props) {
	useEffect(() => {
		// Disable page scrolling when overlay is active
		document.body.style.overflow = 'hidden';

		return () => {
			// Restore scrolling when overlay is removed
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		createPortal(
			<motion.div
				{...variants}
				className={styles.overlay}
				onClick={onClick}
			/>,
			document.body
		)
	);
}

export { Overlay };