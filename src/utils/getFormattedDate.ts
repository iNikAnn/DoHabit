/**
 * Formats a Date object into a string in the "YYYY-MM-DD" format.
 */
function getFormattedDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export default getFormattedDate;