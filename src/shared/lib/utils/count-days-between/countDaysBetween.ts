import { DAY_MS } from '../../../../constants';

/**
 * Calculates the number of full days between two dates,
 * excluding the start and end days.
 */
function countDaysBetween(dateObj1: Date, dateObj2: Date): number {
	return Math.abs((dateObj1.getTime() - dateObj2.getTime()) / DAY_MS) - 1;
}

export { countDaysBetween };