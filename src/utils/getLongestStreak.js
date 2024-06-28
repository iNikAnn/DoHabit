function getLongestStreak(completedDays, frequency) {
	const arr = [];
	const oneDay = 24 * 60 * 60 * 1000;

	let streak = 0;
	const lastDayProgress = completedDays[0]?.progress;

	if (!lastDayProgress) {
		return 0;
	};

	if (lastDayProgress === frequency) {
		streak++;
	};

	for (let i = 1; i <= completedDays.length; i++) {
		const currDay = new Date(completedDays[i]?.date);
		const nextDay = new Date(completedDays[i - 1].date);

		if (!currDay) break;

		if ((nextDay - currDay) / oneDay === 1) {
			streak++;
			continue;
		};

		arr.push(streak);
		streak = 1;
	};

	return Math.max(...arr);
}

export default getLongestStreak;