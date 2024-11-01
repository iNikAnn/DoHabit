function getDayGap(dateObj1, dateObj2) {
	if (!(dateObj1 instanceof Date) || !(dateObj2 instanceof Date)) {
		console.error('Both arguments must be Date objects. Returning 0.');
		return 0;
	};

	const oneDay = 86_400_000;

	return Math.abs((dateObj1 - dateObj2) / oneDay - 1);
}

export default getDayGap;