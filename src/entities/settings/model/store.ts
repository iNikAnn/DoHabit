import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SettingsState } from './types';
import { settingsReducer } from './reducer';

const customStorage = {
	getItem: (key: string) => {
		// Fallback to old 'settings' key if the new one doesn't exist yet
		const raw = localStorage.getItem(key) ?? localStorage.getItem('settings');
		if (!raw) return null;

		try {
			// Check if we are migrating from the old flat-object format
			if (localStorage.getItem('settings')) {
				const data = JSON.parse(raw);

				const migratedData = {
					state: { settings: data },
					version: 0
				};

				const jsonString = JSON.stringify(migratedData);

				localStorage.removeItem('settings');
				localStorage.setItem(key, jsonString);

				return jsonString;
			}

			return raw;
		} catch (error) {
			return null;
		}
	},

	setItem: (key: string, value: string) => localStorage.setItem(key, value),
	removeItem: (key: string) => localStorage.removeItem(key)
}

/**
 * Settings store providing state and a dispatch function.
 */
export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			settings: {},

			settingsDispatch: (action) => set(
				(s) => ({ settings: settingsReducer(s.settings, action) })
			)
		}),
		{
			name: 'dohabit-settings-storage',
			storage: createJSONStorage(() => customStorage)
		}
	)
);