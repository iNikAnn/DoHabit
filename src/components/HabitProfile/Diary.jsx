import styles from '../../css/Diary.module.css';

// components
import Note from './Note';

import { ReactComponent as InfoSvg } from '../../img/information.svg';

function Diary({ diary, onCreateNote, onDeleteNote }) {
	const notes = !diary || diary.length === 0
		? (
			<span className={styles.emptyDiaryList}>
				<InfoSvg />
				<span>Your diary is empty. Start adding notes to keep track of your progress and thoughts.</span>
			</span>
		)
		: (
			<ul className={styles.list}>
				{[...diary].reverse().map(
					(note) => (
						<Note
							key={note.date}
							text={note.text}
							date={note.date}
							{...{ onDeleteNote }}
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
					onClick={onCreateNote}
				>
					Create Note
				</button>
			</div>

			{notes}
		</div>
	)
}

export default Diary;