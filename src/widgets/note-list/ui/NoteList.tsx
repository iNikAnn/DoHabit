import styles from './NoteList.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useNoteActions } from '../model/useNoteActions';
import { type Note, NoteCard, useNotesStore } from '@entities/note';
import { InformationIcon } from '@shared/assets';
import { Placeholder } from '@shared/ui';

interface NoteListProps {
	habitId?: string;
	onEdit: (note: Note) => void;
}

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
	const { openNoteMenu } = useNoteActions();

	// Filter notes by habitId or get general notes if habitId is undefined.
	// Sort by date, newest first.
	const filteredNotes = notes
		.filter((n) => habitId ? n.habitId === habitId : !n.habitId)
		.sort((a, b) => b.createdAt - a.createdAt);

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
					{filteredNotes.map((note) => (
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
		</div>
	);
}

export { NoteList };