import { create } from 'zustand';
import { type AchievementState } from './types';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@shared/const';

/**
 * Manages the state of unlocked achievements and their timestamps.
 */
export const useAchievementsStore = create<AchievementState>()(
	persist(
		(set) => ({
			unlockedAt: {},

			unlock: (id) => set((state) => {
				// Prevent overwriting the unlock date if already achieved
				if (state.unlockedAt[id]) return state;

				return {
					unlockedAt: {
						...state.unlockedAt,
						[id]: new Date().getTime()
					}
				};
			})
		}),
		{
			name: STORAGE_KEYS.ACHIEVEMENTS
		}
	)
);