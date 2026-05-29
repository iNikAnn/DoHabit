/**
 * Returns the start and exclusive end timestamps for a specific year.
 */
function getYearBoundaries(year: number): [number, number] {
	const start = new Date(year, 0, 1).getTime();
	const end = new Date(year + 1, 0, 1).getTime();

	return [start, end];
};

export { getYearBoundaries };