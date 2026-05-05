import styles from './Dialog.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useDialogStore } from '../model/store';
import { Overlay } from '@shared/ui';
import TextButton from '../../../../components/Actions/TextButton';

const dialogVariants = {
	initial: { opacity: 0, y: '-40%', x: '-50%' },
	animate: { opacity: 1, y: '-50%', x: '-50%' },
	exit: { opacity: 0, y: '-40%', x: '-50%' },
	transition: {
		duration: .2,
		ease: 'easeInOut'
	}
};

/**
 * Dialog component controlled via global state.
 */
function Dialog() {
	const content = useDialogStore((s) => s.content);
	const closeDialog = useDialogStore((s) => s.close);

	return (
		// @ts-ignore
		<AnimatePresence>
			{content && (
				<>
					<Overlay key='dialog-overlay' onClick={closeDialog} />

					<motion.div
						key='dialog'
						className={styles.dialog}
						{...dialogVariants}
					>
						<div className={styles.content}>
							{content.title && (
								<div>
									<h3>{content.title}</h3>

									{content.subTitle && (
										<small className={styles.subTitle}>
											{content.subTitle}
										</small>
									)}
								</div>
							)}

							{content.imgSrc && (
								<img src={content.imgSrc} alt={content.title} className={styles.img} />
							)}

							{content.text && (
								<div className={styles.text}>
									{content.text.split('\n').map((line, i) => (
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
			)}
		</AnimatePresence>
	);
}

export { Dialog };