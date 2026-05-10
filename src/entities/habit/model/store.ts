import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { HabitState } from './types';
import { initHabits } from './init';
import habitsReducer from './reducer';
import { habitMigrations } from './migrations';

const CURRENT_VERSION = 1;

const customStorage = {
	getItem: (key: string) => {
		// Fallback to old 'habits' key if the new one doesn't exist yet
		const raw = localStorage.getItem(key) ?? localStorage.getItem('habits');
		if (!raw) return null;

		try {
			let data = JSON.parse(raw);
			let needsSave = false;

			// MIGRATION: Convert old raw array [{}, {}]
			// to Zustand object { state: { habits: [] }, version: 0 }
			if (Array.isArray(data)) {
				data = {
					state: { habits: data },
					version: 0
				};

				localStorage.removeItem('habits');
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

			// CLEANUP: Filter out unfinished habit days before loading into the store
			if (data?.state?.habits) {
				const cleanedHabits = initHabits(data.state.habits);

				// Update storage only if some habits were actually cleaned
				if (JSON.stringify(cleanedHabits) !== JSON.stringify(data.state.habits)) {
					data.state.habits = cleanedHabits;
					needsSave = true;
				}
			}

			const jsonData = JSON.stringify(data);

			// Sync storage if data structure or habits were changed during load
			if (needsSave) {
				localStorage.setItem(key, jsonData);
			}

			return jsonData;
		} catch (error) {
			console.error('Failed to parse storage data:', error);
			return null;
		}
	},

	setItem: (key: string, value: string) => localStorage.setItem(key, value),
	removeItem: (key: string) => localStorage.removeItem(key)
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
			)
		}),
		{
			name: 'dohabit-habits-storage',
			storage: createJSONStorage(() => customStorage),
			version: CURRENT_VERSION,
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
		}
	)
);