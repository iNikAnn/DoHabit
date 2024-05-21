// utils
import getFormattedDate from './getFormattedDate';

function checkHabitCompletion(completedDays, thisDay, frequency) {
	return Boolean(completedDays.find((day) => {
		return (
			day.date === getFormattedDate(thisDay)
			&& day.progress >= frequency
		);
	}));
}

export default checkHabitCompletion;