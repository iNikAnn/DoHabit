import styles from '../../css/NoteList.module.css';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import Note from './Note';

function NoteList({ diary, onStartEditNote, onDeleteNote }) {
	const notes = [...diary]
		.reverse()
		.map(
			(note) => (
				<Note
					key={note.date}
					{...note}
					{...{ onStartEditNote, onDeleteNote }}
				/>
			)
		);

	return (
		<div>
			<ul className={styles.list}>
				<AnimatePresence initial={false}>
					{notes}
				</AnimatePresence>
			</ul>
		</div>
	);
}

export default NoteList;