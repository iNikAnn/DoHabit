import styles from '../../css/Note.module.css';

function Note({ text, date, time }) {
	return (
		<div className={styles.note}>
			<div>{text}</div>

			<span className={styles.desc}>
				<div className={styles.date}>
					<small>{date}</small>
					<small>{time}</small>
				</div>
			</span>
		</div>
	);
}

export default Note;