import styles from '../../css/Dialog.module.css';

// motion
import { motion } from 'framer-motion';

// stores
import { useDialogStore } from '../../stores/dialogStore';

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

function Dialog() {

	const { title, subTitle, imgSrc, text } = useDialogStore((s) => s.content) ?? {};
	const closeDialog = useDialogStore((s) => s.close);

	return (
		<>
			<Overlay onClick={closeDialog} />

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
						onClick={closeDialog}
					/>
				</div>
			</motion.div>
		</>
	);
}

export default Dialog;