import styles from './Dialog.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useDialogStore } from '../model/store';
import { createPortal } from 'react-dom';
import { useNativeBackClose } from '@shared/lib';
import { Overlay } from '@shared/ui';

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
	useNativeBackClose(Boolean(content), closeDialog)

	return (
		// @ts-ignore
		<AnimatePresence>
			{content && (
				<>
					<Overlay key='dialog-overlay' onClick={closeDialog} />

					{createPortal(
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
						</motion.div>,
						document.body
					)}
				</>
			)}
		</AnimatePresence>
	);
}

export { Dialog };