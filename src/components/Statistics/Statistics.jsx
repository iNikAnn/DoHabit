import styles from '../../css/Statistics.module.css';

// components
import StreakBlock from './StreakBlock';
import WeekdayBlock from './WeekdayBlock'

function Statistics(props) {
	const {
		habits, habitTitle,
	} = props;

	const habit = habits.find((h) => h.title === habitTitle);

	return (
		<div>
			<StreakBlock {...{ habit }} />
		</div>
	);
}

export default Statistics;