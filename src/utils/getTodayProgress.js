import getFormattedDate from './getFormattedDate';

function getTodayProgress(completedDays) {
	const firstDay = completedDays[0];
	const isToday = firstDay?.date === getFormattedDate(new Date());

	return isToday ? Number(firstDay.progress) : 0;
}

export default getTodayProgress;