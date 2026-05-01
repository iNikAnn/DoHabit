import styles from '../../css/Note.module.css';

// framer
import { motion } from 'framer-motion';

// hooks
import { useLayoutEffect, useRef, useState } from 'react';
import useIsInitialRender from '../../hooks/useIsInitialRender';

// types
import { Note } from '../../types/diary';

// utils
import getListAnimationVariants from '../../utils/getListAnimationVariants';
import { formatDate, truncateText } from '@shared/lib/utils';

interface Props {
	note: Note;
	onStartEditNote: (noteCreationDate: string, currentText: string) => void;
	onDeleteNote: (noteCreationDate: string) => void;
}

function NoteCard({ note, onStartEditNote, onDeleteNote }: Props) {

	const dateTimeStr = formatDate(new Date(note.date), { includeTime: true });
	const isFirstRender = useIsInitialRender();
	const textRef = useRef<HTMLDivElement>(null);
	const [displayText, setDisplayText] = useState(note.text);

	useLayoutEffect(
		() => {
			let currText = note.text;

			if (isFirstRender && textRef.current) {
				currText = truncateText(textRef.current, currText);
			}

			setDisplayText(currText);
		},
		[isFirstRender, note.text]
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
					<small>{dateTimeStr}</small>

					{!!note.streak && (
						<small>{'Streak: ' + note.streak}</small>
					)}
				</div>

				<div className={styles.actions}>
					{displayText !== note.text && (
						<button
							style={{ color: 'dodgerblue' }}
							className={styles.actionBtn}
							onClick={() => setDisplayText(note.text)}
						>
							Expand
						</button>
					)}

					<button
						className={styles.actionBtn}
						onClick={() => onStartEditNote(note.date, note.text)}
					>
						{/* <MdEditSquare /> */}
						Edit
					</button>

					<button
						className={styles.actionBtn}
						onClick={() => onDeleteNote(note.date)}
					>
						{/* <MdDeleteForever /> */}
						Delete
					</button>
				</div>
			</div>
		</motion.div>
	);
}

export default NoteCard;