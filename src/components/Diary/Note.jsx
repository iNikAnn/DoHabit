import styles from '../../css/Note.module.css';

// react
import { useLayoutEffect, useRef, useState } from 'react';

// framer
import { motion } from 'framer-motion';

// utils
import getListAnimationVariants from '../../utils/getListAnimationVariants';
import getTruncatedText from '../../utils/getTruncatedText';

function Note({ text, date, streak, onStartEditNote, onDeleteNote }) {

	const dateStr = new Date(date).toLocaleDateString();
	const timeStr = new Date(date).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', minute: '2-digit' }
	);

	const isFirstRender = useRef(true);
	const textRef = useRef(null);
	const [displayText, setDisplayText] = useState(text);

	useLayoutEffect(
		() => {
			let currText = text;

			if (isFirstRender.current) {
				currText = getTruncatedText(textRef.current, currText);
				isFirstRender.current = false;
			};

			setDisplayText(currText);
		},
		[text]
	);

	const noteVariants = getListAnimationVariants(0.3);

	return (
		<motion.div
			className={styles.note}
			{...noteVariants}
			layout
		>
			<div
				ref={textRef}
				className={styles.text}
			>
				{displayText}
			</div>

			<div className={styles.desc}>
				<div className={styles.date}>
					<small>{dateStr}</small>
					<small>{timeStr}</small>

					{streak > 0 && (
						<small>{'Streak: ' + streak}</small>
					)}
				</div>

				<div className={styles.actions}>
					{displayText !== text && (
						<button
							style={{ color: 'dodgerblue' }}
							className={styles.actionBtn}
							onClick={() => setDisplayText(text)}
						>
							Expand
						</button>
					)}

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
			</div>
		</motion.div>
	);
}

export default Note;