import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { type AchievementState } from './types';
import { STORAGE_KEYS } from '@shared/const';

const idbStorage: PersistStorage<unknown> = {
	getItem: async (key) => {
		if (localStorage.getItem('achievements')) {
			localStorage.removeItem('achievements');
		}

		// Migrate legacy localStorage data to IndexedDB
		const legacyData = localStorage.getItem(key);
		if (legacyData) {
			try {
				const parsed = JSON.parse(localStorage.getItem(key) as string);

				await set(key, parsed);
				localStorage.removeItem(key);

				return parsed;
			} catch (error) {
				console.error(error);
				localStorage.removeItem(key);
			}
		}

		return (await get(key)) ?? null;
	},

	setItem: async (key, value) => {
		await set(key, value);
	},

	removeItem: async (key) => {
		await del(key);
	}
}

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
			}),

			_hasHydrated: false,
			setHasHydrated: (state) => set(() => ({ _hasHydrated: state }))
		}),
		{
			name: STORAGE_KEYS.ACHIEVEMENTS,
			storage: idbStorage,

			partialize: (s) => ({
				unlockedAt: s.unlockedAt
			}),

			onRehydrateStorage: () => (s) => {
				s?.setHasHydrated(true);
			}
		}
	)
);