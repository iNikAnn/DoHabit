import styles from '../css/Overlay.module.css';

// react
import { useEffect } from 'react';

// framer
import { motion } from 'framer-motion';

// variants
const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .2 }
};

function Overlay({ onClick }) {

	useEffect(
		() => {
			document.body.style.overflow = 'hidden';

			return () => {
				document.body.style.overflow = 'auto';
			};
		},
		[]
	);

	return (
		<motion.div
			{...variants}
			className={styles.overlay}
			onClick={onClick}
		/>
	);
}

export default Overlay;