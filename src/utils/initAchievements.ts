// types
import { Achievement } from '../types/achievement';

// db
import dbAchievements from '../db/dbAchievements';

// utils
import { readLocalStorage } from '@shared/lib/utils';

/**
 * Merge base achievements with saved progress.
 */
function initAchievements(): Achievement[] {
	const savedAchs = readLocalStorage<Achievement[]>('achievements', []);

	// Updates achievements to match the database,
	// preserving the unlocked status from local storage
	return dbAchievements.map(
		(dbAch) => {
			const saved = savedAchs.find(
				(savedAch) => savedAch.id === dbAch.id
			);

			return {
				...dbAch,
				isUnlocked: saved?.isUnlocked ?? false,
				unlockDate: saved?.unlockDate
			};
		}
	);
}

export default initAchievements;