/**
 * Calculates the number of full days between two Date objects,
 * excluding the start and end days.
 *
 * @param {Date} dateObj1 - The first Date object.
 * @param {Date} dateObj2 - The second Date object.
 * @returns {number} - The number of full days between the two dates,
 *                     excluding the start and end days.
 *                     Returns 0 if either argument is not a Date object.
 */

function getDayGap(dateObj1, dateObj2) {
	if (!(dateObj1 instanceof Date) || !(dateObj2 instanceof Date)) {
		console.error('Both arguments must be Date objects. Returning 0.');
		return 0;
	};

	const oneDay = 86_400_000;

	return Math.abs((dateObj1 - dateObj2) / oneDay) - 1;
}

export default getDayGap;