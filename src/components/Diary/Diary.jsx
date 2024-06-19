import styles from '../../css/Diary.module.css';

// react
import { ReactComponent as InfoSvg } from '../../img/information.svg';

// components
import NoteList from './NoteList';
import Placeholder from '../Placeholder';

// db
import dbColors from '../../db/dbColors';

function Diary(props) {
	const {
		habits, habitTitle,

		// 'on' functions
		onUpdate
	} = props;


	const habit = habits.find((habit) => habit.title === habitTitle);
	const hasNotes = habit.diary && habit.diary.length;
	const accentColor = dbColors[habit.colorIndex];

	// create new note
	const handleCreateNote = () => {
		const newNote = {
			text: window.prompt('New note:'),
			date: new Date()
		};

		if (!newNote.text) return;

		onUpdate({
			mode: 'createNote',
			habitTitle: habit.title,
			newNote
		});
	};

	// delete note
	const handleDeleteNote = (noteCreationDate) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			onUpdate({
				mode: 'deleteNote',
				habitTitle: habit.title,
				noteCreationDate
			});
		};
	};

	return (
		<>
			{hasNotes ? (
				<NoteList
					diary={habit.diary}
					onCreateNote={handleCreateNote}
					onDeleteNote={handleDeleteNote}
				/>
			) : (
				<Placeholder
					image={<InfoSvg />}
					title="This habit's diary is empty."
					desc="Add your first note to start tracking your progress and thoughts."
					textOnButton="Add First Note"
					onClick={handleCreateNote}
					{...{ accentColor }}
				/>
			)}
		</>
	);
}

export default Diary;