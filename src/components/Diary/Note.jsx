import styles from '../../css/Note.module.css';

function Note({ text, date, onDeleteNote }) {
	const dateStr = new Date(date).toLocaleDateString();
	const timeStr = new Date(date).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', minute: '2-digit' }
	);

	const maxTextLength = 90;
	const shortText = text.length > maxTextLength
		? text.slice(0, 90).trim() + '...'
		: text;

	return (
		<div
			className={styles.note}
			onDoubleClick={() => onDeleteNote(date)}
		>
			<div>{shortText}</div>

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