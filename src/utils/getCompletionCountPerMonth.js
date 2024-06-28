function getCompletionCountPerMonth(completedDays, frequency) {
	const months = {
		0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
		6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0
	};

	for (const day of completedDays) {
		if (day.progress < frequency) continue;
		const month = new Date(day.date).getMonth();
		months[month] += 1;
	};

	return Object.values(months);
}

export default getCompletionCountPerMonth;