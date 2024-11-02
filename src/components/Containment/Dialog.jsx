import styles from '../../css/Dialog.module.css';

// motion
import { motion } from 'framer-motion';

// components
import Overlay from '../Overlay';
import TextButton from '../Actions/TextButton';

// variants
const dialogVariants = {
	initial: { opacity: 0, y: '-40%', x: '-50%' },
	animate: { opacity: 1, y: '-50%', x: '-50%' },
	exit: { opacity: 0, y: '-40%', x: '-50%' },

	transition: {
		duration: .2,
		ease: 'easeInOut'
	}
};

function Dialog({ content, onClose }) {
	return (
		<>
			<Overlay onClick={onClose} />

			<motion.div
				className={styles.dialog}
				{...dialogVariants}
			>
				<div>
					{content}
				</div>

				<div className={styles.btnsWrapper}>
					<TextButton
						text="Close"
						onClick={onClose}
					/>
				</div>
			</motion.div>
		</>
	);
}

export default Dialog;