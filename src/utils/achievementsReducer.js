// utils
import saveToLocalStorage from './saveToLocalStorage';
import getStreaks from './getStreaks';
import getDayGap from './getDayGap';
import getCompletionGaps from './getCompletionGaps';
import getFormattedDate from './getFormattedDate';

const todayDateStr = getFormattedDate(new Date());

function achievementsReducer(achievements, actions) {
	const { habits, onOpenDialog, isInitialRender } = actions;

	const handleUnlockAchievement = (achievement) => {
		achievement.isUnlocked = true;
		achievement.unlockDate = new Date();

		if (!isInitialRender) {
			onOpenDialog({
				title: 'Achievement Unlocked!',
				imgSrc: `${process.env.PUBLIC_URL}/img/achievements/${achievement.id}.svg`,
				text: `${achievement.title}\n${achievement.desc}`
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