/**
 * Calculates the number of full days between two dates,
 * excluding the start and end days.
 */
function countDaysBetween(d1: Date, d2: Date): number {
	const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
	const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

	const current = new Date(Math.min(date1.getTime(), date2.getTime()));
	const target = new Date(Math.max(date1.getTime(), date2.getTime()));

	// Skip the start date to make interval exclusive
	current.setDate(current.getDate() + 1);

	let days = 0;

	while (current < target) {
		current.setDate(current.getDate() + 1);
		days++;
	}

	return days;
}

export { countDaysBetween };