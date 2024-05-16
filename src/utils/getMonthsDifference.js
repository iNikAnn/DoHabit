function getMonthsDifference(startMonth, endMonth) {
	let months = (endMonth.getFullYear() - startMonth.getFullYear()) * 12;
	months -= startMonth.getMonth();
	months += endMonth.getMonth();

	return months <= 0 ? 1 : months + 1;
}

export default getMonthsDifference;