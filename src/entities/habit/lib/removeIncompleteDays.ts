import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';

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
			const isIncomplete = day.progress !== undefined && day.progress < frequency;

			return !(isBeforeToday && isIncomplete);
		}
	);
}

export default removeIncompleteDays;