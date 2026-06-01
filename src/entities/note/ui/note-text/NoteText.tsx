import styles from './NoteText.module.css';
import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';

interface NoteTextProps {
	text: string;
}

function NoteText({ text }: NoteTextProps) {
	return (
		<div className={styles.note}>
			<Linkify options={{ tagName: 'span', className: styles.tag }}>
				{text}
			</Linkify>
		</div>
	);
}

export default NoteText;