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

	return dateObj.toISOString().split('T')[0];
}

export default getFormattedDate;