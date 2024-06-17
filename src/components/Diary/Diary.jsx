import styles from '../../css/Diary.module.css';

// components
import NoteList from './NoteList';

function Diary(props) {
	const {
		habits, habitTitle,

		// 'on' functions
		onUpdate
	} = props;

	const habit = habits.find((habit) => habit.title === habitTitle);

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
		<NoteList
			diary={habit.diary}
			onCreateNote={handleCreateNote}
			onDeleteNote={handleDeleteNote}
		/>
	);
}

export default Diary;