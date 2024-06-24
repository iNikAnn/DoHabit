// utils
import getFormattedDate from './getFormattedDate';

function checkHabitCompletion(completedDays, date, frequency) {
	return Boolean(
		completedDays.find(
			(day) => (
				day.date === getFormattedDate(date)
				&& day.progress >= frequency
			)
		)
	);
}

export default checkHabitCompletion;