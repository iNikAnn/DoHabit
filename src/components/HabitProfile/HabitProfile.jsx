import styles from '../../css/HabitProfile.module.css';

// components
import Diary from './Diary';

function HabitProfile({ habits, habitTitle }) {
	const habit = habits.find((habit) => habit.title === habitTitle);

	return (
		<Diary
			diary={habit.diary}
		/>
	);
}

export default HabitProfile;