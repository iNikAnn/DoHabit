function getCompletionCountPerDay(completedDays, frequency) {
	const days = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

	for (const day of completedDays) {
		if (day.progress < frequency) continue;
		const dayOfWeek = new Date(day.date).getDay();
		days[dayOfWeek] = (days[dayOfWeek] || 0) + 1;
	};

	return Object.values(days);
}

export default getCompletionCountPerDay;