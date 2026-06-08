import styles from './Dialog.module.css';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useDialogStore } from '../model/store';
import { variants } from '../model/animations';
import { useNativeBackClose } from '@shared/lib/dom';
import { Button, Overlay } from '@shared/ui';

/**
 * Dialog component controlled via global state.
 */
function Dialog() {
	const content = useDialogStore((s) => s.content);
	const closeDialog = useDialogStore((s) => s.close);
	useNativeBackClose(Boolean(content), closeDialog);

	return (
		<AnimatePresence>
			{content && (
				<>
					<Overlay key='dialog-overlay' onClick={closeDialog} />

					{createPortal(
						<motion.div
							key='dialog'
							className={styles.dialog}
							variants={variants}
							initial='initial'
							animate='animate'
							exit='exit'
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

								{content.actions && (
									<ul
										className={styles.actions}
										onClick={closeDialog}
									>
										{content.actions.map(({ label, indicator, ...rest }) => (
											<li key={label}>
												<Button
													className={styles.actionButton}
													indicator={{
														type: indicator?.type ?? 'none',
														style: { color: 'var(--color-secondary)', ...indicator?.style }
													}}
													{...rest}
												>
													{label}
												</Button>
											</li>
										))}
									</ul>
								)}
							</div>
						</motion.div>,
						document.body
					)}
				</>
			)}
		</AnimatePresence >
	);
}

export { Dialog };