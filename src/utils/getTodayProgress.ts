// types
import { CompletedDay } from '../types/habit';

// utils
import getFormattedDate from './getFormattedDate';

/**
 * Gets the progress value for the current day if it exists.
 */
function getTodayProgress(completedDays: CompletedDay[]): number {
	const today = getFormattedDate(new Date());
	const latestEntry = completedDays[0];

	if (latestEntry?.date === today) {
		return latestEntry.progress;
	}

	return 0;
}

export default getTodayProgress;