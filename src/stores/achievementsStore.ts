import { create } from 'zustand';

// types
import { AchievementContext, AchievementState } from '../types/achievement';

// utils
import initAchievements from '../utils/initAchievements';
import achievementsReducer from '../utils/achievementsReducer';

/**
 * Global store for managing achievement progress and state.
 */
export const useAchievementsStore = create<AchievementState>(
	(set) => ({
		achievements: initAchievements(),

		achievementsDispatch: (context: AchievementContext) => set(
			(s) => ({ achievements: achievementsReducer(s.achievements, context) })
		)
	})
);