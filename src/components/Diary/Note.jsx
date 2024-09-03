import styles from '../../css/Note.module.css';

function Note({ text, date, onDeleteNote }) {
	const dateStr = new Date(date).toLocaleDateString();
	const timeStr = new Date(date).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', minute: '2-digit' }
	);

	return (
		<div
			className={styles.note}
			// onDoubleClick={() => onDeleteNote(date)}
			onClick={() => onDeleteNote(date)}
		>
			<div>{text}</div>

			<span className={styles.desc}>
				<div className={styles.date}>
					<small>{dateStr}</small>
					<small>{timeStr}</small>
				</div>
			</span>
		</div>
	);
}

export default Note;