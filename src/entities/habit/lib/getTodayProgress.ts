import { formatDate } from '@shared/lib';

interface Params {
	frequency: number;
	currentProgress: number;
	lastActivityDate: string;
}

interface Result {
	progress: number;
	percentage: number;
	isCompleted: boolean;
}

/**
 * Calculates current day progress based on habit frequency.
 * Resets to zero if lastActivityDate is not today.
 */
function getTodayProgress(params: Params): Result {
	const {
		frequency,
		currentProgress,
		lastActivityDate
	} = params;

	const today = formatDate(new Date());

	// If latest activity was on a different day,
	// progress is 0
	if (lastActivityDate !== today) {
		return {
			progress: 0,
			percentage: 0,
			isCompleted: false
		};
	}

	return {
		progress: currentProgress,
		percentage: Math.floor((currentProgress / frequency) * 100),
		isCompleted: currentProgress >= frequency
	};
}

export { getTodayProgress };