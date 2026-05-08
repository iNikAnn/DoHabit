import { create } from 'zustand';
import { SettingsState } from './types';
import { initSettings } from './init';
import { settingsReducer } from './reducer';

/**
 * Settings store providing state and a dispatch function.
 */
export const useSettingsStore = create<SettingsState>(
	(set) => ({
		settings: initSettings(),

		settingsDispatch: (action) => set(
			(s) => ({ settings: settingsReducer(s.settings, action) })
		)
	})
);