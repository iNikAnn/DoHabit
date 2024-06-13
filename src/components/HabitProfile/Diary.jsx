import styles from '../../css/Diary.module.css';

// components
import Note from './Note';

function Diary({ diary, handleCreateNote }) {
	const notes = !diary || diary.length === 0
		? <span>Your diary is empty.</span>
		: (
			<ul className={styles.list}>
				{[...diary].reverse().map(
					(note) => {
						console.log(note.date);
						const date = new Date(note.date).toLocaleDateString();
						const time = new Date(note.date).toLocaleTimeString(
							'en-GB',
							{ hour: '2-digit', minute: '2-digit' }
						);

						return (
							<Note
								key={note.date}
								text={note.text}
								{...{ date, time }}
							/>
						)
					}
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