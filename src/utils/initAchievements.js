// utils
import getFromLocalStorage from './getFromLocalStorage';

// db
import dbAchievements from '../db/dbAchievements';

function initAchievements() {
	let storedAchievements = getFromLocalStorage('achievements', dbAchievements);

	// Updates achievements to match the database,
	// preserving the unlocked status from local storage
	const updatedAchievements = dbAchievements.map(
		(a) => {
			const existingAchievement = storedAchievements.find((localA) => a.id === localA.id);

			if (existingAchievement) {
				return {
					...a,
					isUnlocked: existingAchievement.isUnlocked,
					unlockDate: existingAchievement.unlockDate
				};
			};

			return a;
		}
	);

	return updatedAchievements;
}

export default initAchievements;