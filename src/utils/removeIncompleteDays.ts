// types
import { CompletedDay } from '../types/habit';

// utils
import { formatDate } from '@shared/lib/utils';

interface Params {
	completedDays: CompletedDay[];
	frequency: number;
}

/**
 * Filters out past days where the progress was lower than the required frequency.
 */
function removeIncompleteDays({ completedDays, frequency }: Params): CompletedDay[] {
	const today = new Date(formatDate(new Date()));

	return completedDays.filter(
		(day) => {
			const isBeforeToday = new Date(day.date) < today;
			const isIncomplete = day.progress < frequency;

			return !(isBeforeToday && isIncomplete);
		}
	);
}

export default removeIncompleteDays;