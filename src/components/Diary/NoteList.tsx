import styles from '../../css/NoteList.module.css';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import NoteCard from './NoteCard';

// types
import { Note } from '../../types/diary';

interface Props {
	diary: Note[];
	onStartEditNote: (noteCreationDate: string, currentText: string) => void;
	onDeleteNote: (noteCreationDate: string) => void;
}

function NoteList({ diary, onStartEditNote, onDeleteNote }: Props) {
	const notes = diary
		// @ts-ignore
		.toReversed()
		// @ts-ignore
		.map((note) => (
			<NoteCard
				key={note.date}
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