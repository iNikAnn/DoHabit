import { DAY_MS } from '../constants';

/**
 * Calculates the number of full days between two Date objects,
 * excluding the start and end days.
 */
function getDayGap(dateObj1: Date, dateObj2: Date): number {
	return Math.abs((dateObj1.getTime() - dateObj2.getTime()) / DAY_MS) - 1;
}

export default getDayGap;