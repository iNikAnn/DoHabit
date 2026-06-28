/**
 * Get the calendar grid offset for the start of the month,
 * assuming Monday is the first day of the week.
 * */
function getMonthStartOffset(date: Date): number {
	const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return (day || 7) - 1;
}

export { getMonthStartOffset };