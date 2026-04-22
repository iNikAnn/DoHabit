/**
 * Calculates the number of months between two dates, including both ends.
 */
function getMonthsCount(startDate: Date, endDate: Date): number {
	const start = startDate.getFullYear() * 12 + startDate.getMonth();
	const end = endDate.getFullYear() * 12 + endDate.getMonth();

	const diff = end - start + 1;

	return Math.max(1, diff);
}

export default getMonthsCount;