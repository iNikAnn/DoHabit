// types
import { CompletedDay } from '../types/habit';

// utils
import { formatDate } from '@shared/lib/utils';

/**
 * Gets the progress value for the current day if it exists.
 */
function getTodayProgress(completedDays: CompletedDay[]): number {
	const today = formatDate(new Date());
	const latestEntry = completedDays[0];

	if (latestEntry?.date === today) {
		return latestEntry.progress;
	}

	return 0;
}

export default getTodayProgress;