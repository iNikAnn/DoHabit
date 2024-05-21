import getFormattedDate from './getFormattedDate';

function getCurrentStreak(completedDays) {
	const today = new Date(getFormattedDate(new Date()));
	const lastDay = new Date(completedDays[0]?.date);
	const oneDay = 24 * 60 * 60 * 1000;

	if ((today - lastDay) / oneDay > 1) {
		return 0;
	}

	let streak = 1;

	for (let i = 1; i < completedDays.length; i++) {
		const currDay = new Date(completedDays[i].date);
		const nextDay = new Date(completedDays[i - 1].date);

		if ((nextDay - currDay) / oneDay === 1) {
			streak++;
			continue;
		};

		break;
	};

	return streak;
}

export default getCurrentStreak;