import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NoteState } from './types';
import { notesReducer } from './reducer';
import { noteMigrations } from './migrations';
import { STORAGE_KEYS } from '@shared/const';

const CURRENT_VERSION = 1;

const customStorage = {
	getItem: (key: string) => {
		// Fallback to old 'mainDiary' key if the new one doesn't exist yet
		const raw = localStorage.getItem(key) ?? localStorage.getItem('mainDiary');
		if (!raw) return null;

		try {
			let data = JSON.parse(raw);
			let needsSave = false;

			// MIGRATION: Convert old raw array [{}, {}]
			// to Zustand object { state: { notes: [] }, version: 0 }
			if (Array.isArray(data)) {
				data = {
					state: { notes: data },
					version: 0
				};

				localStorage.removeItem('mainDiary');
				needsSave = true;
			}

			const jsonString = JSON.stringify(data);

			// Sync storage if data structure or habits were changed during load
			if (needsSave) {
				localStorage.setItem(key, jsonString);
			}

			return jsonString;
		} catch (error) {
			console.error('Failed to parse storage data:', error);
			return null;
		}
	},

	setItem: (key: string, value: string) => localStorage.setItem(key, value),
	removeItem: (key: string) => localStorage.removeItem(key)
}

/**
 * Note store providing state and a dispatch function.
 */
export const useNotesStore = create<NoteState>()(
	persist(
		(set) => ({
			notes: [],

			notesDispatch: (actions) => set(
				(s) => ({ notes: notesReducer(s.notes, actions) })
			)
		}),
		{
			name: STORAGE_KEYS.NOTES,
			storage: createJSONStorage(() => customStorage),
			version: CURRENT_VERSION,
			migrate: (persistedState, version) => {
				let newState = persistedState;

				for (let i = version; i < CURRENT_VERSION; i++) {
					const migration = noteMigrations[i + 1];

					if (migration) {
						console.log(`Migrating notes from v${i} to v${i + 1}`);
						newState = migration(newState);
					}
				}

				return newState;
			},
		}
	)
);