import styles from './DiaryToolbar.module.css';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@shared/ui';
import { AnimatePresence, type Variants } from 'framer-motion';

interface DiaryToolbarProps {
	showToolbar: boolean;
	showScrollTop: boolean;
	onScrollTop: () => void;
	onActivate: () => void;
}

const variants: Variants = {
	initial: {
		scale: 0.5,
		opacity: 0,
	},

	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 350,
			damping: 18
		}
	},

	exit: {
		scale: 0.5,
		opacity: 0,
		transition: {
			duration: 0.2
		}
	}
};

function DiaryToolbar(props: DiaryToolbarProps) {
	const {
		showToolbar,
		showScrollTop,
		onScrollTop,
		onActivate
	} = props;

	return (
		<div className={styles.toolbar}>
			<AnimatePresence initial={false}>
				{(showToolbar && showScrollTop) && (
					<Button
						key='scroll-to-top-button'
						className={styles.scrollToTopButton}

						variants={variants}
						initial='initial'
						animate='animate'
						exit='exit'

						onClick={onScrollTop}
					>
						UP
					</Button>
				)}

				{showToolbar && (
					<Button
						key='activate-note-form-button'
						className={styles.activateNoteFormButton}

						variants={variants}
						initial='initial'
						animate='animate'
						exit='exit'

						onClick={onActivate}
					>
						<FaPlus />
					</Button>
				)}
			</AnimatePresence>
		</div>
	);
}

export default DiaryToolbar;