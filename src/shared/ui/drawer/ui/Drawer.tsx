import styles from './Drawer.module.css';
import { Button, Overlay } from '@shared/ui';
import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import { useDrawerStore } from '../model/store';
import { createPortal } from 'react-dom';

const drawerVariants = {
	initial: { opacity: 0, y: '25%' },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: '50%' },
	transition: { duration: .2, ease: 'easeOut' }
};

/**
 * Interactive bottom sheet component controlled via global state.
 */
function Drawer() {
	const content = useDrawerStore((s) => s.content);
	const closeDrawer = useDrawerStore((s) => s.close);

	const handleDragEnd = (_: any, info: PanInfo) => {
		if (info.offset.y >= 100) {
			closeDrawer();
			navigator?.vibrate?.(10);
		}
	};

	return (
		// @ts-ignore
		<AnimatePresence>
			{content && (
				<>
					<Overlay key='drawer-overlay' onClick={closeDrawer} />

					{createPortal(
						<motion.div
							key='drawer'
							className={styles.drawer}
							{...drawerVariants}
							drag='y'
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={{ top: 0.1, bottom: 1 }}
							onDragEnd={handleDragEnd}
						>
							<div className={styles.handle} />
							<h3 className={styles.title}>{content.title}</h3>

							{content.actions && (
								<ul
									className={styles.actions}
									onClick={closeDrawer}
								>
									{content.actions.map(({ label, indicator, ...rest }) => (
										<li key={label}>
											<Button
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
						</motion.div>,
						document.body
					)}
				</>
			)}
		</AnimatePresence >
	);
}

export { Drawer };