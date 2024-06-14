import styles from '../../css/Diary.module.css';

// components
import Note from './Note';

function Diary({ diary, handleCreateNote }) {
	const notes = !diary || diary.length === 0
		? <span>Your diary is empty.</span>
		: (
			<ul className={styles.list}>
				{[...diary].reverse().map(
					(note) => (
						<Note
							key={note.date}
							text={note.text}
							date={note.date}
						/>
					)
				)}
			</ul>
		);

	return (
		<div>
			<div className={styles.header}>
				<h3>Diary</h3>

				<button
					type='button'
					className='text-button'
					onClick={handleCreateNote}
				>
					Create Note
				</button>
			</div>

			{notes}
		</div>
	)
}

export default Diary;