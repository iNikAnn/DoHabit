import styles from '../../css/NoteList.module.css';
import { AnimatePresence } from 'framer-motion';
import { Note, NoteCard } from '@entities/note';

interface Props {
	diary: Note[];
	onStartEditNote: (noteId: string, currentText: string) => void;
	onDeleteNote: (noteId: string) => void;
}

function NoteList({ diary, onStartEditNote, onDeleteNote }: Props) {
	const notes = diary
		// @ts-ignore
		.toReversed()
		// @ts-ignore
		.map((note) => (
			<NoteCard
				key={note.id}
				note={note}
				onStartEditNote={onStartEditNote}
				onDeleteNote={onDeleteNote}
			/>
		));

	return (
		<div>
			<ul className={styles.list}>
				{/* @ts-ignore */}
				<AnimatePresence initial={false}>
					{notes}
				</AnimatePresence>
			</ul>
		</div>
	);
}

export default NoteList;