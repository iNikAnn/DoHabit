import { create } from 'zustand';

// types
import { SettingsState } from '../types/settings';

// utils
import initSettings from '../utils/initSettings';
import settingsReducer from '../utils/settingsReducer';

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