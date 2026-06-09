import styles from './DiaryToolbar.module.css';
import { AnimatePresence, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useNoteFormStore } from '@features/manage-note';
import { removeNote } from '@features/remove-note';
import { useNotesStore } from '@entities/note';
import { Button } from '@shared/ui';

interface DiaryToolbarProps {
	showScrollTop: boolean;
	onScrollTop: () => void;
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

const motionProps = {
	variants,
	initial: 'initial',
	animate: 'animate',
	exit: 'exit'
}

function DiaryToolbar(props: DiaryToolbarProps) {
	const {
		showScrollTop,
		onScrollTop,
	} = props;

	// UI localization
	const { t } = useTranslation();

	// Form state
	const isFormOpen = useNoteFormStore((s) => s.isOpen);
	const openNoteForm = useNoteFormStore((s) => s.openCreate);
	const showToolbar = !isFormOpen;

	// Bulk selection state
	const isSelectionMode = useNotesStore((s) => s.isSelectionMode);
	const selectedIds = useNotesStore((s) => s.selectedIds);
	const exitSelectionMode = useNotesStore((s) => s.exitSelectionMode);

	return (
		<div className={styles.toolbar}>
			<AnimatePresence initial={false} mode='popLayout'>
				{(showToolbar && showScrollTop) && (
					<Button
						key='scroll-to-top-button'
						className={styles.scrollToTopButton}
						onClick={onScrollTop}
						{...motionProps}
					>
						UP
					</Button>
				)}

				{/* Activate note form button */}
				{(showToolbar && !isSelectionMode) && (
					<Button
						key='activate-note-form-button'
						className={styles.activateNoteFormButton}
						onClick={openNoteForm}
						{...motionProps}
					>
						<FaPlus />
					</Button>
				)}

				{/* Bulk selection actions */}
				{(showToolbar && isSelectionMode) && (
					<Button
						key='delete-selected-notes-button'
						variant='danger'
						onClick={() => removeNote(
							selectedIds,
							() => {
								exitSelectionMode();
								toast.success(t('notes.notifications.deleteSuccess'));
							}
						)}
						{...motionProps}
					>
						<FaTrash />
					</Button>
				)}
			</AnimatePresence>
		</div>
	);
}

export default DiaryToolbar;