function getCurrentStreak(completedDays) {
	const today = new Date();
	const lastDay = new Date(completedDays[0]);

	if (today.toDateString() !== lastDay.toDateString()) {
		return 0;
	};

	let streak = 1;

	for (let i = 1; i < completedDays.length; i++) {
		const currDay = new Date(completedDays[i]);
		const nextDay = new Date(completedDays[i - 1]);
		const oneDay = 24 * 60 * 60 * 1000;

		if ((nextDay - currDay) / oneDay === 1) {
			streak++;
		};
	};

	return streak;
}

export default getCurrentStreak;