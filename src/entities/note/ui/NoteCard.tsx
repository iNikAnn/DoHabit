import styles from './NoteCard.module.css';
import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Note } from '../model/types';
import getListAnimationVariants from '../../../utils/getListAnimationVariants';
import { formatDate, truncateText, useIsFirstRender } from '@shared/lib';

interface NoteCardProps {
	note: Note;
	onClick: () => void;
}

function NoteCard(props: NoteCardProps) {
	const {
		note,
		onClick
	} = props;

	const dateTimeStr = formatDate(new Date(note.createdAt), { includeTime: true });
	const isFirstRender = useIsFirstRender();
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
			onClick={onClick}
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
				</div>
			</div>
		</motion.div>
	);
}

export { NoteCard };