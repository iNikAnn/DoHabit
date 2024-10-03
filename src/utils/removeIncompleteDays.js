// utils
import getFormattedDate from './getFormattedDate';

function removeIncompleteDays(completedDays, frequency) {
	const today = new Date(getFormattedDate(new Date()));

	return completedDays.filter(
		(d) => {
			if (typeof d.date === 'undefined' || typeof d.progress === 'undefined') {
				return true;
			};

			const isBeforeToday = new Date(d.date) < today;
			const isIncomplete = d.progress < frequency;

			return !(isBeforeToday && isIncomplete);
		}
	);
}

export default removeIncompleteDays;