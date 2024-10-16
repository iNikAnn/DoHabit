import styles from '../../css/CompactCalendar.module.css';

// utils
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function CompactCalendar({ colorPalette, completedDays, frequency }) {

	const { baseColor, darkenedColor } = colorPalette;
	const months = 6;
	const columns = months * 4;

	const dates = Array.from(
		{ length: (7 * (columns - 1)) + (new Date().getDay() || 7) },
		(_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000)
	);

	const checkedDates = checkHabitCompletion(completedDays, frequency, ...dates);

	const weeks = checkedDates
		.reduce(
			(acc, curr, i) => {
				const isSunday = dates[i].getDay() === 0;

				if (isSunday) {
					acc.push([curr]);
				} else {
					acc.length === 0 ? acc.push([curr]) : acc[acc.length - 1].unshift(curr);
				};

				return acc;
			},
			[]
		)
		.reverse();

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
			className={styles.calendar}
		>
			{weeks.map((w, weekIndex) => (
				<div key={weekIndex} className={styles.week}>
					{w.map((isCompleted, dayIndex) => {

						const isToday = weekIndex === weeks.length - 1 && dayIndex === w.length - 1;

						return (
							<div
								key={dayIndex}
								style={{
									backgroundColor: isCompleted ? baseColor : darkenedColor
								}}
								className={`${styles.day} ${isToday ? styles.today : ''}`}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}

export default CompactCalendar;