import { create } from 'zustand';
import { AchievementState } from './types';
import { formatDate } from '@shared/lib';

/**
 * Manages the state of unlocked achievements and their timestamps.
 */
export const useAchievementsStore = create<AchievementState>()(
	// TODO: use persist
	(set) => ({
		unlockedAt: {},

		unlock: (id) => set((state) => {
			// Prevent overwriting the unlock date if already achieved
			if (state.unlockedAt[id]) return state;

			return {
				unlockedAt: {
					...state.unlockedAt,
					[id]: formatDate(new Date())
				}
			};
		})
	})
);