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
				case 5: {
					const streaks = [];
					for (const h of habits) {
						const { longestStreak } = getStreaks(h.completedDays, h.frequency);
						streaks.push(longestStreak);
					};

					shouldUnlock = streaks.some((s) => s >= a.criteria.streak);
				};
					break;

				case 6: {
					const gaps = [];
					for (const h of habits) {
						gaps.push(...getCompletionGaps(h.completedDays, h.frequency));
					};

					shouldUnlock = Math.max(...gaps) >= a.criteria.gap;
				};
					break;

				case 7: {
					const gaps = [];
					for (const h of habits) {
						gaps.push(...getCompletionGaps(h.completedDays, h.frequency));
					};

					shouldUnlock = gaps.includes(a.criteria.gap);
				};
					break;

				case 8: {
					const gaps = [];
					for (const h of habits) {
						if (!h.creationDate || h.completedDays.length) continue;

						gaps.push(getDayGap(
							new Date(getFormattedDate(new Date(h.creationDate))),
							new Date(todayDateStr)
						));
					};

					shouldUnlock = gaps.some((g) => g >= a.criteria.gap);
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