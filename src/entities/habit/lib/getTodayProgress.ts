import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';

interface Params {
	completedDays: CompletedDay[];
	frequency: number;
}

interface Result {
	progress: number;
	percentage: number;
	isCompleted: boolean;
}

/**
 * Calculates current day progress based on habit frequency.
 * Returns progress value, percentage, and completion status.
 */
function getTodayProgress(params: Params): Result {
	const {
		completedDays,
		frequency
	} = params;

	const today = formatDate(new Date());
	const latestEntry = completedDays[0];

	// No entries for today yet
	if (latestEntry?.date !== today) {
		return {
			progress: 0,
			percentage: 0,
			isCompleted: false
		};
	}

	const { progress = 0 } = latestEntry;

	return {
		progress: progress,
		percentage: Math.floor((progress / frequency) * 100),
		isCompleted: progress >= frequency
	};
}

export { getTodayProgress };