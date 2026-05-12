import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';

/**
 * Resolves completed dates into a Set.
 */
function getCompletedDatesSet(completedDays: CompletedDay[], ...dates: Date[]): Set<string> {
	const result = new Set<string>();
	if (completedDays.length === 0 || dates.length === 0) return result;

	// Prepare targets and find the oldest one to set a deadline
	const targetDateStrings = dates.map((d) => formatDate(d));
	const oldestTarget = targetDateStrings.reduce((a, b) => a < b ? a : b);
	const targetSet = new Set(targetDateStrings);

	for (const entry of completedDays) {
		// All targets found. Stop.
		if (result.size === targetSet.size) break;

		// Current entry is older than oldest target. Stop.
		if (entry.date < oldestTarget) break;

		if (targetSet.has(entry.date)) {
			result.add(entry.date);
		}
	}

	return result;
}

export { getCompletedDatesSet };