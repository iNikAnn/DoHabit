// utils
import { CompletedDay } from '../types/habit';
import getFormattedDate from './getFormattedDate';

interface Params {
	completedDays: CompletedDay[];
	frequency: number;
}

/**
 * Filters out past days where the progress was lower than the required frequency.
 */
function removeIncompleteDays({ completedDays, frequency }: Params): CompletedDay[] {
	const today = new Date(getFormattedDate(new Date()));

	return completedDays.filter(
		(day) => {
			const isBeforeToday = new Date(day.date) < today;
			const isIncomplete = day.progress < frequency;

			return !(isBeforeToday && isIncomplete);
		}
	);
}

export default removeIncompleteDays;