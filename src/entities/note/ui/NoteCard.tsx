import styles from './NoteCard.module.css';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useLongPress } from 'use-long-press';
import { FaCheckCircle } from 'react-icons/fa';
import NoteText from './note-text/NoteText';
import { useNotesStore } from '../model/store';
import type { Note } from '../model/types';
import { formatDate } from '@shared/lib/date-time';

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

	// UI localization
	const { t } = useTranslation();

	const isSelectionMode = useNotesStore((s) => s.isSelectionMode);
	const isSelected = useNotesStore((s) => s.isSelectionMode && s.selectedIds.has(note.id));

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
		threshold: 500,
		cancelOnMovement: 10,
		onFinish: () => setTimeout(() => {
			isLongPressedRef.current = false
		}, 50)
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
			className={clsx(
				styles.note,
				isSelected && styles.isSelected
			)}
			onClick={handleClick}
		>
			<NoteText
				text={note.text}
				disableLinks={isSelectionMode}
				onTagClick={onTagClick}
			/>

			<div className={styles.description}>
				<div className={styles.date}>
					<small>{dateTimeStr}</small>
				</div>

				{!!note.streak && (
					<small>{`${t('habits.stats.streak')}: ${note.streak}`}</small>
				)}
			</div>

			{/* Render checkmark if note is selected */}
			{isSelected && (
				<div className={styles.selectBadge}>
					<FaCheckCircle />
				</div>
			)}
		</div>
	);
}

export { NoteCard };