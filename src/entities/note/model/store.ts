import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { NoteState } from './types';
import { notesReducer } from './reducer';
import { noteMigrations } from './migrations';
import { STORAGE_KEYS } from '@shared/const';

const CURRENT_VERSION = 1;

const idbStorage: PersistStorage<unknown> = {
	getItem: async (key) => {
		// Fallback to old 'mainDiary' key if the new one doesn't exist yet
		const raw = (await get(key)) ?? localStorage.getItem(key) ?? localStorage.getItem('mainDiary');
		if (!raw) return null;

		try {
			let data = typeof raw === 'string' ? JSON.parse(raw) : raw;
			let needsSave = false;

			// MIGRATION: Convert old raw array [{}, {}]
			// to Zustand object { state: { notes: [] }, version: 0 }
			if (Array.isArray(data)) {
				data = {
					state: { notes: data },
					version: 0
				};

				needsSave = true;
			}

			// Sync storage if data structure or habits were changed during load
			if (needsSave || localStorage.getItem(key) || localStorage.getItem('mainDiary')) {
				await set(key, data);

				localStorage.removeItem(key);
				localStorage.removeItem('mainDiary');
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
 * Note store providing state and a dispatch function.
 */
export const useNotesStore = create<NoteState>()(
	persist(
		(set) => ({
			notes: [],

			// Bulk mode
			isSelectionMode: false,
			selectedIds: new Set(),

			enterSelectionMode: (initialId) => set(() => ({
				isSelectionMode: true,
				selectedIds: new Set(initialId ? [initialId] : [])
			})),

			exitSelectionMode: () => set(() => ({
				isSelectionMode: false,
				selectedIds: new Set(),
			})),

			toggleSelect: (id) => set((s) => {
				const nextSelected = new Set(s.selectedIds);

				if (nextSelected.has(id)) {
					nextSelected.delete(id);
				} else {
					nextSelected.add(id);
				}

				const isSelectionMode = nextSelected.size > 0;

				return { selectedIds: nextSelected, isSelectionMode };
			}),

			notesDispatch: (action) => set(
				(s) => ({ notes: notesReducer(s.notes, action) })
			),

			_hasHydrated: false,
			setHasHydrated: (state) => set(() => ({ _hasHydrated: state }))
		}),
		{
			name: STORAGE_KEYS.NOTES,
			storage: idbStorage,
			version: CURRENT_VERSION,

			partialize: (s) => ({
				notes: s.notes
			}),

			migrate: async (persistedState, version) => {
				let newState = persistedState;

				for (let i = version; i < CURRENT_VERSION; i++) {
					const migration = noteMigrations[i + 1];

					if (migration) {
						console.log(`Migrating notes from v${i} to v${i + 1}`);
						newState = await migration(newState);
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

export const notesStore = useNotesStore;