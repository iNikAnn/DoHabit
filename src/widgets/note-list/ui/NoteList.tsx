import styles from './NoteList.module.css';
import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNoteActions } from '../model/useNoteActions';
import { type Note, NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { useIntersectionObserver } from '@shared/lib/dom';
import { Placeholder } from '@shared/ui';

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
	const { openNoteMenu } = useNoteActions();

	// Filter notes by habitId or get general notes if habitId is undefined.
	// Sort by date, newest first.
	const filteredNotes = useMemo(() => {
		return notes
			.filter((n) => habitId ? n.habitId === habitId : !n.habitId)
			.sort((a, b) => b.createdAt - a.createdAt);
	}, [habitId, notes]);

	const visibleNotes = filteredNotes.slice(0, visibleCount);

	// Trigger loading next page when user scrolls to the bottom element
	const loadMoreRef = useIntersectionObserver({
		onIntersect: useCallback(() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE), []),
		enabled: visibleNotes.length < filteredNotes.length,
		options: observerOptions
	});

	// 1. Handle empty state
	if (filteredNotes.length === 0) {
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
		<div>
			<ul className={styles.list}>
				<AnimatePresence initial={false}>
					{visibleNotes.map((note) => (
						<motion.li
							key={note.id}
							whileTap={{
								filter: 'brightness(0.8)',
								scale: 0.96
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

			{visibleNotes.length < filteredNotes.length && (
				<div ref={loadMoreRef} style={{ height: '60px' }} />
			)}
		</div>
	);
}

export { NoteList };