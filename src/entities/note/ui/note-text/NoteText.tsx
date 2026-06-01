import styles from './NoteText.module.css';
import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';

interface NoteTextProps {
	text: string;
	onTagClick: (tag: string) => void;
}

function NoteText(props: NoteTextProps) {
	const {
		text,
		onTagClick
	} = props;

	const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>, tag?: string) => {
		e.preventDefault();
		e.stopPropagation();

		if (tag) onTagClick(tag);
	};

	return (
		<div className={styles.note}>
			<Linkify
				options={{
					render: ({ content }) => (
						<button
							className={styles.tag}
							onClick={(e) => handleTagClick(e, content)}
						>
							{content}
						</button>
					)
				}}
			>
				{text}
			</Linkify>
		</div>
	);
}

export default NoteText;