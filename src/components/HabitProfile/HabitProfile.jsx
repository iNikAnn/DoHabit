import styles from '../../css/HabitProfile.module.css';

// components
import Diary from './Diary';

function HabitProfile(props) {
	const {
		habits, habitTitle,

		// 'on' functions
		onCreateNote
	} = props;

	const habit = habits.find((habit) => habit.title === habitTitle);

	// create new note
	const handleCreateNote = () => {
		const newNote = {
			text: prompt('New note:'),
			date: new Date()
		};

		if (!newNote.text) return;

		onCreateNote({
			mode: 'createNote',
			habitTitle: habit.title,
			newNote
		});
	};

	return (
		<Diary
			diary={habit.diary}
			{...{ handleCreateNote }}
		/>
	);
}

export default HabitProfile;