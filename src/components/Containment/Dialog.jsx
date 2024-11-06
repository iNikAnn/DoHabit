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

function Dialog({ title, subTitle, imgSrc, text, onClose }) {
	return (
		<>
			<Overlay onClick={onClose} />

			<motion.div
				className={styles.dialog}
				{...dialogVariants}
			>
				<div className={styles.content}>
					{title && (
						<div>
							<h3>{title}</h3>

							{subTitle && (
								<small className={styles.subTitle}>
									{subTitle}
								</small>
							)}
						</div>
					)}

					{imgSrc && (
						<img src={imgSrc} alt={title} className={styles.img} />
					)}

					{text && (
						<div className={styles.text}>
							{text.split('\n').map((line, i) => (
								<div key={i}>{line}</div>
							))}
						</div>
					)}
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