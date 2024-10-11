import styles from '../../css/Note.module.css';

// react
import { useState } from 'react';

// framer
import { motion } from 'framer-motion';

// utils
import getListAnimationVariants from '../../utils/getListAnimationVariants';

// icons
import { MdEditSquare } from "react-icons/md"; // edit
import { MdDeleteForever } from "react-icons/md"; // delete

function Note({ text, date, onStartEditNote, onDeleteNote }) {
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

	const noteVariants = getListAnimationVariants(0.3);

	return (
		<motion.div
			className={styles.note}
			{...noteVariants}
			layout
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
					<button
						className={styles.actionBtn}
						onClick={() => onStartEditNote(date, text)}
					>
						{/* <MdEditSquare /> */}
						Edit
					</button>

					<button
						className={styles.actionBtn}
						onClick={() => onDeleteNote(date)}
					>
						{/* <MdDeleteForever /> */}
						Delete
					</button>
				</div>
			</span>
		</motion.div>
	);
}

export default Note;