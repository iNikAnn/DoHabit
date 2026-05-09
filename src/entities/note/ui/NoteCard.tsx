import styles from './NoteCard.module.css';
import { motion } from 'framer-motion';
import { Note } from '../model/types';
import getListAnimationVariants from '../../../utils/getListAnimationVariants';
import { formatDate } from '@shared/lib';

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
	const noteVariants = getListAnimationVariants(0.3);

	return (
		<motion.div
			className={styles.note}
			{...noteVariants}
			layout
			onClick={onClick}
		>
			<div className={styles.text}>
				{note.text}
			</div>

			<div className={styles.description}>
				<div className={styles.date}>
					<small>{dateTimeStr}</small>
				</div>

				{!!note.streak && (
					<small>{'Streak: ' + note.streak}</small>
				)}
			</div>
		</motion.div>
	);
}

export { NoteCard };