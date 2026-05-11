import { CompletedDay } from '../model/types';
import { formatDate, getYesterday } from '@shared/lib';

/**
 * Checks if yesterday was completed by looking at the latest two entries.
 */
function isYesterdayCompleted(completedDays: CompletedDay[]): boolean {
	const yStr = formatDate(getYesterday());

	return completedDays[0]?.date === yStr || completedDays[1]?.date === yStr;
}

export { isYesterdayCompleted };