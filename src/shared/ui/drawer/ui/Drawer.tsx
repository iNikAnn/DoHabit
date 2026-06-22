import styles from './Drawer.module.css';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { variants } from '../model/animations';
import { useDrawerStore } from '../model/store';
import { useNativeBackClose } from '@shared/lib/dom';
import { Button, Overlay, Placeholder } from '@shared/ui';
import clsx from 'clsx';

/**
 * Interactive bottom sheet component controlled via global state.
 */
function Drawer() {
	const content = useDrawerStore((s) => s.content);
	const closeDrawer = useDrawerStore((s) => s.close);
	useNativeBackClose(Boolean(content), closeDrawer);

	const handleDragEnd = (_: any, info: PanInfo) => {
		if (info.offset.y >= 100) {
			closeDrawer();
			navigator?.vibrate?.(10);
		}
	};

	return (
		<AnimatePresence>
			{content && (
				<>
					<Overlay key='drawer-overlay' onClick={closeDrawer} />

					{createPortal(
						<motion.div
							key='drawer'
							className={styles.drawer}
							variants={variants}
							initial='initial'
							animate='animate'
							exit='exit'
							drag='y'
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={{ top: 0.1, bottom: 1 }}
							onDragEnd={handleDragEnd}
						>
							<div className={styles.handle} />
							<h3 className={styles.title}>{content.title}</h3>

							{content.actions && content.actions.length > 0 && (
								<ul
									className={styles.actions}
									onClick={closeDrawer}
								>
									{content.actions.map(({ label, className, indicator, ...rest }) => (
										<li key={label}>
											<Button
												className={clsx(className, styles.actionButton)}
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

							{content.placeholder && (
								<div className={styles.placeholderWrapper}>
									<Placeholder
										content={content.placeholder.content}
									/>
								</div>
							)}
						</motion.div>,
						document.body
					)}
				</>
			)
			}
		</AnimatePresence >
	);
}

export { Drawer };