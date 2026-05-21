/**
 * Returns a Date object set to yesterday.
 */
function getYesterday(): Date {
	const date = new Date();
	date.setDate(date.getDate() - 1);

	return date;
}

export { getYesterday };