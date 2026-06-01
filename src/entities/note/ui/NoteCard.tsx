import styles from './NoteCard.module.css';
import type { Note } from '../model/types';
import { formatDate } from '@shared/lib/date-time';
import NoteText from './note-text/NoteText';

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

	return (
		<div
			className={styles.note}
			onClick={onClick}
		>
			<NoteText text={note.text} />

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