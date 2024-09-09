import styles from '../../css/Note.module.css';

// react
import { useState } from 'react';

// icons
import { MdEditSquare } from "react-icons/md"; // edit
import { MdDeleteForever } from "react-icons/md"; // delete

function Note({ text, date, onDeleteNote }) {
	const dateStr = new Date(date).toLocaleDateString();
	const timeStr = new Date(date).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', minute: '2-digit' }
	);

	const [isCollapsed, setIsCollapsed] = useState(true);

	const MAX_TEXT_LENGTH = 100;
	const isTextExceeded = text.length > MAX_TEXT_LENGTH;
	const displayedText = isTextExceeded && isCollapsed
		? text.slice(0, MAX_TEXT_LENGTH - 10).trim() + '...'
		: text;

	return (
		<div
			className={styles.note}
			onDoubleClick={() => onDeleteNote(date)}
		>
			<div>
				{displayedText}

				{(isTextExceeded && isCollapsed) && (
					<button
						style={{ marginLeft: '0.6rem' }}
						className="text-button"
						onClick={() => setIsCollapsed((prev) => !prev)}
					>
						Expand
					</button>
				)}
			</div>

			<span className={styles.desc}>
				<div className={styles.date}>
					<small>{dateStr}</small>
					<small>{timeStr}</small>
				</div>

				<div className={styles.actions}>
					<button className={styles.actionBtn}>
						<MdEditSquare />
						Edit
					</button>

					<button className={styles.actionBtn}>
						<MdDeleteForever />
						Delete
					</button>
				</div>
			</span>
		</div>
	);
}

export default Note;