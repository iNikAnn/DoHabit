import styles from '../../css/NoteList.module.css';

// components
import Note from './Note';

function NoteList({ diary, onCreateNote, onDeleteNote }) {

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
			<div className={styles.header}>
				<h3>Diary</h3>

				<button
					type='button'
					className='text-button'
					onClick={onCreateNote}
				>
					Create Note
				</button>
			</div>

			<ul className={styles.list}>
				{notes}
			</ul>
		</div>
	);
}

export default NoteList;