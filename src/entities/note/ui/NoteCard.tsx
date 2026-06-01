import styles from './NoteCard.module.css';
import type { Note } from '../model/types';
import { formatDate } from '@shared/lib/date-time';
import NoteText from './note-text/NoteText';

interface NoteCardProps {
	note: Note;
	onCardClick: () => void;
	onTagClick: (tag: string) => void;
}

function NoteCard(props: NoteCardProps) {
	const {
		note,
		onCardClick,
		onTagClick
	} = props;

	const dateTimeStr = formatDate(new Date(note.createdAt), { includeTime: true });

	return (
		<div
			className={styles.note}
			onClick={onCardClick}
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