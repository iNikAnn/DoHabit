function getStartMonth(completedDays) {
	const today = new Date();
	const lastDay = new Date(completedDays[0]);

	if (today.toDateString() !== lastDay.toDateString() || completedDays.length === 1) {
		return today;
	};

	for (let i = 1; i <= completedDays.length; i++) {
		const currDay = new Date(completedDays[i]);
		const nextDay = new Date(completedDays[i - 1]);
		const oneDay = 24 * 60 * 60 * 1000;

		if ((nextDay - currDay) / oneDay === 1) {
			continue;
		} else {
			return nextDay;
		};
	};
}

export default getStartMonth;