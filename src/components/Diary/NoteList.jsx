import styles from '../../css/NoteList.module.css';

// components
import Note from './Note';

function NoteList({ diary, onDeleteNote }) {

	const notes = [...diary]
		.reverse()
		.map(
			(note) => (
				<Note
					key={note.date}
					text={note.text}
					date={note.date}
					{...{ onDeleteNote }}
				/>
			)
		);

	return (
		<div>
			<ul className={styles.list}>
				{notes}
			</ul>
		</div>
	);
}

export default NoteList;