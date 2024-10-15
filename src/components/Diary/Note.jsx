import styles from '../../css/Note.module.css';

// react
import { useLayoutEffect, useRef, useState } from 'react';

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

	const isFirstRender = useRef(true);
	const textRef = useRef(null);
	const [displayText, setDisplayText] = useState(text);

	useLayoutEffect(
		() => {
			let currText = text;

			if (isFirstRender.current) {
				const el = textRef.current;
				if (!el) return;

				const elLineHeight = parseFloat(getComputedStyle(el).lineHeight);
				const maxHeight = elLineHeight * 3;

				el.textContent = currText;

				let isFirst = true;
				while (el.offsetHeight > maxHeight && currText.length > 0) {
					currText = currText.slice(0, isFirst ? -1 : -4) + '...';
					el.textContent = currText;
					if (isFirst) isFirst = false;
				};

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

			<span className={styles.desc}>
				<div className={styles.date}>
					<small>{dateStr}</small>
					<small>{timeStr}</small>
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
			</span>
		</motion.div>
	);
}

export default Note;