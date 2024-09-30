import styles from '../css/Overlay.module.css';

// framer
import { motion } from 'framer-motion'

function Overlay() {
	const variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 }
	};

	return (
		<motion.div
			{...variants}
			className={styles.overlay}
		/>
	);
}

export default Overlay;