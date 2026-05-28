import styles from './NoteList.module.css';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNoteActions } from '../model/useNoteActions';
import { type Note, NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { useIntersectionObserver } from '@shared/lib/dom';
import { Placeholder, SegmentedControl } from '@shared/ui';

interface NoteListProps {
	habitId?: string;
	onEdit: (note: Note) => void;
}

const ITEMS_PER_PAGE = 15;
const observerOptions = { scrollMargin: '220px' };

/**
 * Note list widget.
 * Shows notes for a specific habit or general app notes.
 */
function NoteList(props: NoteListProps) {
	const {
		habitId,
		onEdit
	} = props;

	const notes = useNotesStore((s) => s.notes);
	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
	const [selectedYear, setSelectedYear] = useState<'All' | number>('All');
	const { openNoteMenu } = useNoteActions();

	// Get all notes for the current view context (habit or global)
	// Sort by date, newest first.
	const scopeNotes = useMemo(() => {
		return notes.filter((n) => habitId ? n.habitId === habitId : !n.habitId);
	}, [habitId, notes]);

	// Extract years only from the contextual scope notes
	const availableYears = useMemo(() => {
		const years = scopeNotes.map((n) => new Date(n.createdAt).getFullYear());
		return Array.from(new Set(years)).sort((a, b) => b - a);
	}, [scopeNotes]);

	// Filter by selected year
	const yearNotes = useMemo(() => {
		if (selectedYear === 'All') return scopeNotes;

		return scopeNotes
			.filter((n) => new Date(n.createdAt).getFullYear() === selectedYear)
			.sort((a, b) => b.createdAt - a.createdAt); // Newest first
	}, [scopeNotes, selectedYear]);

	const visibleNotes = yearNotes.slice(0, visibleCount);

	// Trigger loading next page when user scrolls to the bottom element
	const loadMoreRef = useIntersectionObserver({
		onIntersect: useCallback(() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE), []),
		enabled: visibleNotes.length < yearNotes.length,
		options: observerOptions
	});

	// 1. Handle empty state
	if (scopeNotes.length === 0) {
		return (
			<Placeholder
				content={{
					image: <InformationIcon />,
					title: 'Diary is empty',
					description: 'Add your first note to start tracking your progress and thoughts.'
				}}
			/>
		);
	}

	// 2. Render list
	return (
		<div className={styles.container}>
			{availableYears.length > 1 && (
				<SegmentedControl
					options={['All', ...availableYears].map((v) => ({ value: String(v) }))}
					value={String(selectedYear)}
					onChange={(v) => setSelectedYear(v === 'All' ? 'All' : Number(v))}
				/>
			)}

			<ul className={styles.list}>
				<AnimatePresence initial={false}>
					{visibleNotes.map((note) => (
						<motion.li
							key={note.id}
							whileTap={{
								filter: 'brightness(0.8)',
								scale: 0.98
							}}
							transition={{ duration: 0.1 }}
						>
							<NoteCard
								note={note}
								onClick={() => openNoteMenu({ note, onEdit })}
							/>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>

			{visibleNotes.length < yearNotes.length && (
				<div ref={loadMoreRef} style={{ height: '60px' }} />
			)}
		</div>
	);
}

export { NoteList };