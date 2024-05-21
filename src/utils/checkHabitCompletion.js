// utils
import getFormattedDate from './getFormattedDate';

function checkHabitCompletion(completedDays, thisDay, frequency) {
	return Boolean(completedDays.find((day) => {
		return (
			day.date === getFormattedDate(thisDay)
			&& parseInt(day.progress) === parseInt(frequency)
		);
	}));
}

export default checkHabitCompletion;