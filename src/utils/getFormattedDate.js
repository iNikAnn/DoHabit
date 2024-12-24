/**
 * Formats a Date object into a string in the "YYYY-MM-DD" format.
 *
 * @param {Date} dateObj - The Date object to format.
 * @returns {string} - The date in "YYYY-MM-DD" format.
 * @throws {TypeError} - If dateObj is not a Date object.
 */

function getFormattedDate(dateObj) {
	if (!(dateObj instanceof Date)) {
		throw new TypeError('Argument must be a Date object.');
	};

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, 0);
	const day = String(dateObj.getDate()).padStart(2, 0);

	return year + '-' + month + '-' + day;
}

export default getFormattedDate;