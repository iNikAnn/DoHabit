// utils
import getFormattedDate from './getFormattedDate';

function updateCompletedDays(completedDays, newFrequency) {
	return completedDays.map(
		(day) => (
			day.date === getFormattedDate(new Date()) && day.progress < newFrequency
				? day
				: { ...day, progress: newFrequency }
		)
	);
}

export default updateCompletedDays;