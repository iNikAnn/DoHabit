import styles from './NoteCard.module.css';
import { useRef } from 'react';
import { useLongPress } from 'use-long-press';
import type { Note } from '../model/types';
import { formatDate } from '@shared/lib/date-time';
import NoteText from './note-text/NoteText';

interface NoteCardProps {
	note: Note;
	onCardClick: () => void;
	onLongPress: (id: string) => void;
	onTagClick: (tag: string) => void;
}

function NoteCard(props: NoteCardProps) {
	const {
		note,
		onCardClick,
		onLongPress,
		onTagClick
	} = props;

	/**
	 * Ref to track if a long press event was recently triggered.
	 */
	const isLongPressedRef = useRef(false);

	/**
	 * Handles the long press activation.
	 */
	const handleLongPress = () => {
		isLongPressedRef.current = true;
		onLongPress(note.id);
	};

	const bind = useLongPress(handleLongPress, {
		threshold: 300,
		cancelOnMovement: 10
	});

	/**
	 * Handles the standard card click,
	 * preventing action if triggered by a long press.
	 */
	const handleClick = () => {
		if (isLongPressedRef.current) {
			isLongPressedRef.current = false;
			return;
		};

		onCardClick();
	};

	const dateTimeStr = formatDate(new Date(note.createdAt), { includeTime: true });

	return (
		<div
			{...bind()}
			className={styles.note}
			onClick={handleClick}
		>
			<NoteText
				text={note.text}
				onTagClick={onTagClick}
			/>

			<div className={styles.description}>
				<div className={styles.date}>
					<small>{dateTimeStr}</small>
				</div>

				{!!note.streak && (
					<small>{'Streak: ' + note.streak}</small>
				)}
			</div>
		</div>
	);
}

export { NoteCard };