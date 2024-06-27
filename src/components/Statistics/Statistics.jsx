import styles from '../../css/Statistics.module.css';

// components
import StreakBlock from './StreakBlock';
import WeekdayBlock from './WeekdayBlock';
import MonthBlock from './MonthBlock';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getLightDimmedColor from '../../utils/getLightDimmedColor';

// db
import dbColors from '../../db/dbColors';

function Statistics(props) {
	const {
		habits, habitTitle,
	} = props;

	const habit = habits.find((h) => h.title === habitTitle);

	// dimmed color
	const color = dbColors[habit.colorIndex];
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	return (
		<div className={styles.statistics}>
			<StreakBlock {...{ habit }} />

			<WeekdayBlock
				{...{ habit, color, dimmedColor, lightDimmedColor }}
			/>

			<MonthBlock />
		</div>
	);
}

export default Statistics;