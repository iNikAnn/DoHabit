import styles from '../../css/Note.module.css';

function Note({ text, date }) {
	const dateStr = new Date(date).toLocaleDateString();
	const timeStr = new Date(date).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', minute: '2-digit' }
	);

	return (
		<div className={styles.note}>
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