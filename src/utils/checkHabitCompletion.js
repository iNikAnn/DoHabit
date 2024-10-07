// utils
import getFormattedDate from './getFormattedDate';

function checkHabitCompletion(completedDays, frequency, ...dates) {
	const results = dates.reduce(
		(acc, date) => {
			const formattedDate = getFormattedDate(date);

			const isCompleted = completedDays.some(
				(day) => (
					day.date === formattedDate
					&& day.progress >= frequency
				)
			);

			acc.push(isCompleted);
			return acc;
		},
		[]
	);

	return results.length === 1 ? results[0] : results;
}

export default checkHabitCompletion;