import styles from './NoteListToolbar.module.css';
import { useMemo } from 'react';
import { AnimatePresence, motion, type Transition, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TagButton from '../tag-button/TagButton';
import SortButton from '../sort-button/SortButton';
import { useNotesStore, type Note } from '@entities/note';
import { extractYearsFromTimeline } from '@shared/lib/date-time';
import { Button, SegmentedControl } from '@shared/ui';

interface NoteListToolbarProps {
	notes: Note[];
	selectedYear: string;
	hasActiveTag: boolean;
	order: 'asc' | 'desc';
	onYearChange: (year: string) => void;
	onTagAction: () => void;
	onOrderChange: () => void;
}

const variants: Variants = {
	initial: {
		y: -20,
		opacity: 0
	},

	animate: {
		y: 0,
		opacity: 1
	},

	exit: {
		y: 20,
		opacity: 0
	}
};

const transition: Transition = {
	type: 'spring',
	stiffness: 300,
	damping: 20
}

const motionProps = {
	variants,
	initial: 'initial',
	animate: 'animate',
	exit: 'exit',
	transition
};

function NoteListToolbar(props: NoteListToolbarProps) {
	const {
		notes,
		selectedYear,
		hasActiveTag,
		order,
		onYearChange,
		onTagAction,
		onOrderChange
	} = props;

	// UI localization
	const { t } = useTranslation();

	const isSelectionMode = useNotesStore((s) => s.isSelectionMode);
	const selectedIds = useNotesStore((s) => s.selectedIds);
	const exitSelectionMode = useNotesStore((s) => s.exitSelectionMode);

	/**
	 * Extracts a list of years to populate the timeline filter options.
	 */
	const availableYears = useMemo(
		() => extractYearsFromTimeline(notes, { order: 'desc' }),
		[notes]
	);

	return (
		<div className={styles.wrapper}>
			<AnimatePresence initial={false} mode='popLayout'>
				{!isSelectionMode && (
					<motion.div
						key='note-list-toolbar'
						className={styles.toolbar}
						{...motionProps}
					>
						<SegmentedControl
							options={[
								{ value: 'all', label: t('common.all') },
								...availableYears.map((v) => ({ value: String(v) }))
							]}
							value={selectedYear}
							onChange={onYearChange}
						/>

						<div className={styles.toolbarActionsWrapper}>
							<TagButton
								isActive={hasActiveTag}
								onClick={onTagAction}
							/>

							<SortButton
								order={order}
								onClick={onOrderChange}
							/>
						</div>
					</motion.div>
				)}

				{isSelectionMode && (
					<motion.div
						key='note-list-selection-toolbar'
						className={styles.selectionToolbar}
						{...motionProps}
					>
						<div className={styles.selectionInfo}>
							<div className={styles.selectionCount}>
								{selectedIds.size}
							</div>

							<div className={styles.selectionLabel}>
								{t('notes.list.selected')}
							</div>
						</div>

						<Button
							onClick={exitSelectionMode}
						>
							{t('common.cancel')}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default NoteListToolbar;