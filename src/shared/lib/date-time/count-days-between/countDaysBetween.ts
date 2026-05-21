import { DAY_MS } from '@shared/const';

/**
 * Calculates the number of full days between two dates,
 * excluding the start and end days.
 */
function countDaysBetween(d1: Date, d2: Date): number {
	const start = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
	const end = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

	return Math.round(Math.abs(start.getTime() - end.getTime()) / DAY_MS);
}

export { countDaysBetween };