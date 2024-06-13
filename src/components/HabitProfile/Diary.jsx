import styles from '../../css/Diary.module.css';

function Diary({ diary, handleCreateNote }) {
	const notes = !diary || diary.length === 0
		? <span>Your diary is empty.</span>
		: (
			<ul className={styles.list}>
				{[...diary].reverse().map(
					(note, index) => (
						<li key={index}>
							{note.text}
						</li>
					)
				)}
			</ul>
		);

	return (
		<div>
			<div className={styles.header}>
				<span>Diary</span>

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