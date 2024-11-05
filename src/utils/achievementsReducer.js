// utils
import saveToLocalStorage from './saveToLocalStorage';
import getStreaks from './getStreaks';
import getDayGap from './getDayGap';
import getCompletionGaps from './getCompletionGaps';
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';
import removeIncompleteFirstDay from './removeIncompleteFirstDay';

const todayDateStr = getFormattedDate(new Date());

function achievementsReducer(achievements, actions) {

	const { habits, onOpenDialog, isInitialRender } = actions;

	const handleUnlockAchievement = (achievement) => {
		achievement.isUnlocked = true;
		achievement.unlockDate = new Date();

		if (isInitialRender) {
			onOpenDialog({
				title: 'Achievement Unlocked!',
				text: 'It seems that new achievements have been unlocked!\nYou can check them in the achievements section.'
			});
		} else {
			onOpenDialog({
				title: 'Achievement Unlocked!',
				imgSrc: `${process.env.PUBLIC_URL}/img/achievements/${achievement.id}.svg`,
				text: `"${achievement.title}"\n${achievement.desc}`
			});
		};
	};

	achievements = achievements.map(
		(a) => {
			if (a.isUnlocked) return a;

			const updatedA = { ...a };
			let shouldUnlock = false;

			switch (a.id) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					shouldUnlock = habits.some(
						(h) => {
							const { longestStreak } = getStreaks(h.completedDays, h.frequency);
							return longestStreak >= a.criteria.streak;
						}
					);
					break;

				case 6:
					shouldUnlock = habits.some(
						(h) => {
							const maxGap = Math.max(...getCompletionGaps(h.completedDays, h.frequency));
							return maxGap >= a.criteria.gap;
						}
					);
					break;

				case 7:
					shouldUnlock = habits.some(
						(h) => {
							const gaps = getCompletionGaps(h.completedDays, h.frequency);
							return gaps.includes(a.criteria.gap);
						}
					);
					break;

				case 8:
					shouldUnlock = habits.some(
						(h) => {
							if (!h.creationDate || h.completedDays.length) return false;

							const gap = getDayGap(
								new Date(getFormattedDate(new Date(h.creationDate))),
								new Date(todayDateStr)
							);

							return gap >= a.criteria.gap;
						}
					);
					break;

				case 9:
					shouldUnlock = habits.some(
						(h) => {
							if (!h.creationDate || !h.completedDays.length) return false;

							const creationDate = new Date(h.creationDate);
							const day = creationDate.getDate();
							const month = creationDate.getMonth();

							if (day === 1 && month === 0) {
								return checkHabitCompletion(h.completedDays, h.frequency, creationDate);
							};

							return false;
						}
					);
					break;

				case 10:
					shouldUnlock = habits.some(
						(h) => {
							const count = h.completedDays.length;

							if (count >= a.criteria.count) {
								return count === a.criteria.count
									? h.completedDays[0].progress >= h.frequency
									: true;
							};

							return false;
						}
					);
					break;

				case 11:
					shouldUnlock = habits.some(
						(h) => {
							const { allStreaks } = getStreaks(h.completedDays, h.frequency);

							return allStreaks.some(
								(s) => {
									const startDate = new Date(s.start);
									const endDate = new Date(s.end);
									const isStartedOnJan1 = startDate.getMonth() === 0 && startDate.getDate() === 1;

									if (isStartedOnJan1) {
										return endDate >= new Date(`${startDate.getFullYear()}-12-31`);
									};

									return false;
								}
							);
						}
					);
					break;

				case 12: {
					if (habits.length < a.criteria.count) {
						shouldUnlock = false;
						break;
					};

					const datesMap = {};
					for (const h of habits) {
						const completedDays = removeIncompleteFirstDay(h.completedDays, h.frequency);

						for (const d of completedDays) {
							const date = d.date
							datesMap[date] = (datesMap[date] || 0) + 1;
						};
					};

					const maxCount = Math.max(...Object.values(datesMap));

					shouldUnlock = maxCount === habits.length;
				};
					break;

				case 13:
					shouldUnlock = habits.some(
						(h) => {
							const { allStreaks } = getStreaks(h.completedDays, h.frequency);

							return allStreaks.some(
								(s) => {
									if (s.length === a.criteria.streak) {
										const gap = getDayGap(new Date(todayDateStr), new Date(s.end));
										return gap > 1;
									};

									return false;
								}
							);
						}
					);
					break;

				case 14:
					shouldUnlock = habits.filter((h) => h.isArchived).length >= a.criteria.count;
					break;

				case 15:
					shouldUnlock = habits.some(
						(h) => {
							const { allStreaks } = getStreaks(h.completedDays, h.frequency);

							for (let i = 0; i < allStreaks.length - 2; i++) {
								if (
									allStreaks[i].length === a.criteria.streak &&
									allStreaks[i + 1].length === a.criteria.streak &&
									allStreaks[i + 2].length === a.criteria.streak
								) {
									const gap = getDayGap(new Date(todayDateStr), new Date(allStreaks[i].end));
									if (gap > 1) return true;
								};
							};

							return false;
						}
					);
					break;

				case 16: {
					const compYdayBtnUsageCount = habits.reduce(
						(acc, h) => (
							acc += h.completedDays.filter((d) => d.isCompYdayBtnUsed).length
						),
						0
					);

					shouldUnlock = compYdayBtnUsageCount >= a.criteria.count;
				};
					break;

				case 17: {
					if (habits.length < a.criteria.count) {
						shouldUnlock = false;
						break;
					};

					const datesMap = {};
					for (const h of habits) {
						const completedDays = removeIncompleteFirstDay(h.completedDays, h.frequency);

						for (const d of completedDays) {
							const date = new Date(d.date);

							const isHalloween = date.getMonth() === 9 && date.getDate() === 31;
							if (isHalloween) {
								datesMap[d.date] = (datesMap[d.date] || 0) + 1;
							};
						};
					};

					const maxCount = Math.max(...Object.values(datesMap));

					shouldUnlock = maxCount === habits.length;
				};
					break;

				case 18: {
					if (habits.length < a.criteria.count) {
						shouldUnlock = false;
						break;
					};

					const datesMap = {};
					for (const h of habits) {
						const completedDays = removeIncompleteFirstDay(h.completedDays, h.frequency);

						for (const d of completedDays) {
							const date = new Date(d.date);

							const isLastDay = date.getMonth() === 11 && date.getDate() === 31;
							if (isLastDay) {
								datesMap[d.date] = (datesMap[d.date] || 0) + 1;
							};
						};
					};

					const maxCount = Math.max(...Object.values(datesMap));

					shouldUnlock = maxCount === habits.length;
				};
					break;

				default:
					break;
			};

			if (shouldUnlock) handleUnlockAchievement(updatedA);

			return updatedA;
		}
	);

	// Save only basic info of unlocked achievements to local storage,
	// full details will be stored in state from
	// the achievements database during initialization
	const basicAchievementsInfo = achievements
		.filter(
			(a) => a.isUnlocked
		)
		.map(
			(a) => ({
				id: a.id,
				isUnlocked: a.isUnlocked,
				unlockDate: a.unlockDate
			})
		);

	saveToLocalStorage('achievements', basicAchievementsInfo);

	return achievements;
}

export default achievementsReducer;