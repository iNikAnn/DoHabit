import { create } from 'zustand';
import getColors from '../utils/getColors';
import { useSettingsStore } from './settingsStore';

const calculateScheme = (isDarkSchemeForced) => {
	return isDarkSchemeForced
		? 'dark'
		: matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
};

export const useColorsStore = create(
	(set) => ({
		colors: getColors(
			calculateScheme(useSettingsStore.getState().settings.isDarkSchemeForced)
		),

		update: (newColors) => set({ colors: newColors })
	})
);

useSettingsStore.subscribe(
	(s) => {
		const scheme = calculateScheme(s.settings.isDarkSchemeForced);

		useColorsStore.getState().update(getColors(scheme));
	}
);