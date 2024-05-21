function getStartMonth(completedDays) {
	const today = new Date();
	const lastDay = new Date(completedDays[0]?.date);

	if (completedDays.length === 1 || today.toDateString() !== lastDay.toDateString()) {
		return today;
	};

	for (let i = 1; i <= completedDays.length; i++) {
		const currDay = new Date(completedDays[i]?.date);
		const nextDay = new Date(completedDays[i - 1]?.date);
		const oneDay = 24 * 60 * 60 * 1000;

		if ((nextDay - currDay) / oneDay === 1) {
			continue;
		} else {
			return nextDay;
		};
	};
}

export default getStartMonth;