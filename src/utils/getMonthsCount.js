/**
 * Calculates the number of months between two Date objects,
 * including both the start and end months.
 *
 * @param {Date} startMonth - The starting Date object.
 * @param {Date} endMonth - The ending Date object.
 * @returns {number} - The number of months between the two dates,
 *                     including both the start and end months.
 * @throws {TypeError} - If either argument is not a Date object.
 */

function getMonthsCount(startMonth, endMonth) {
	if (!(startMonth instanceof Date) || !(endMonth instanceof Date)) {
		throw new TypeError('Both arguments must be Date objects.');
	};

	let months = (endMonth.getFullYear() - startMonth.getFullYear()) * 12;
	months -= startMonth.getMonth();
	months += endMonth.getMonth();

	return months <= 0 ? 1 : months + 1;
}

export default getMonthsCount;