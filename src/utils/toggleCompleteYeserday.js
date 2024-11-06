import getFormattedDate from './getFormattedDate';

function toggleCompleteYeserday(habits, habitTitle, isTodayCompleted, isYesterdayCompleted, todayProgress, frequency) {

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	return habits.map(
		(habit) => {
			habit = { ...habit };

			if (habit.title === habitTitle) {
				let completedDays = [...habit.completedDays];

				if (isYesterdayCompleted) {
					completedDays = completedDays.filter(
						(day) => day.date !== getFormattedDate(yesterday)
					);
				} else {
					const completedYesterday = {
						date: getFormattedDate(yesterday),
						progress: frequency,
						isCompYdayBtnUsed: true
					};

					isTodayCompleted || todayProgress
						? completedDays.splice(1, 0, completedYesterday)
						: completedDays.unshift(completedYesterday);
				};

				habit = {
					...habit,
					completedDays
				};
			};

			return habit;
		}
	);
}

export default toggleCompleteYeserday;