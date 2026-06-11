import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { HabitState } from './types';
import habitsReducer from './reducer';
import { habitMigrations } from './migrations';
import { STORAGE_KEYS } from '@shared/const';

const CURRENT_VERSION = 2;

const idbStorage: PersistStorage<unknown> = {
	getItem: async (key) => {
		// Fallback to old 'habits' key if the new one doesn't exist yet
		const raw = (await get(key)) ?? localStorage.getItem(key) ?? localStorage.getItem('habits');
		if (!raw) return null;

		try {
			let data = typeof raw === 'string' ? JSON.parse(raw) : raw;
			let needsSave = false;

			// MIGRATION: Convert old raw array [{}, {}]
			// to Zustand object { state: { habits: [] }, version: 0 }
			if (Array.isArray(data)) {
				data = {
					state: { habits: data },
					version: 0
				};
				needsSave = true;
			}

			// CLEANUP: Remove habit-linked notes after they are successfully migrated
			const isNotesMigrated = localStorage.getItem('dohabit_notes_migrated') === 'true';

			if (data?.state?.habits && isNotesMigrated) {
				data.state.habits = data.state.habits.map((h: any) => {
					const nextHabit = { ...h };
					delete nextHabit.diary;
					return nextHabit;
				});

				needsSave = true;
				localStorage.removeItem('dohabit_notes_migrated');
			}

			// Sync storage if data structure or habits were changed during load
			if (needsSave || localStorage.getItem(key) || localStorage.getItem('habits')) {
				await set(key, data);

				localStorage.removeItem(key);
				localStorage.removeItem('habits');
			}

			return data;
		} catch (error) {
			console.error('Failed to parse storage data:', error);
			return null;
		}
	},

	setItem: async (key, value) => {
		await set(key, value);
	},

	removeItem: async (key) => {
		await del(key);
	}
}

/**
 * Habits store providing state and a dispatch function.
 */
export const useHabitsStore = create<HabitState>()(
	persist(
		(set) => ({
			habits: [],

			habitsDispatch: (action) => set(
				(s) => ({ habits: habitsReducer(s.habits, action) })
			),

			_hasHydrated: false,
			setHasHydrated: (state) => set(() => ({ _hasHydrated: state }))
		}),
		{
			name: STORAGE_KEYS.HABITS,
			storage: idbStorage,
			version: CURRENT_VERSION,

			partialize: (s) => ({
				habits: s.habits
			}),

			migrate: (persistedState, version) => {
				let newState = persistedState;

				for (let i = version; i < CURRENT_VERSION; i++) {
					const migration = habitMigrations[i + 1];

					if (migration) {
						console.log(`Migrating habits from v${i} to v${i + 1}`);
						newState = migration(newState);
					}
				}

				return newState;
			},

			onRehydrateStorage: () => (s) => {
				s?.setHasHydrated(true);
			}
		}
	)
);

export const habitsStore = useHabitsStore;