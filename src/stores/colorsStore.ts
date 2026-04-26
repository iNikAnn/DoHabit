import { create } from 'zustand';

// hooks
import { useSettingsStore } from './settingsStore';

// types
import { ColorsState } from '../types/colorScheme';

// utils
import getColors from '../utils/getColors';
import getColorScheme from '../utils/getColorScheme';

/**
 * Colors Store.
 * Manages the application's color palette based on the current color scheme.
 */
export const useColorsStore = create<ColorsState>(
	(set) => ({
		colors: getColors(
			getColorScheme(useSettingsStore.getState().settings.isDarkSchemeForced ?? false)
		),

		update: (newColors) => set({ colors: newColors })
	})
);

/**
 * Subscription to Settings Store.
 * Automatically regenerates and updates colors whenever the theme preference changes.
 */
useSettingsStore.subscribe(
	(s) => {
		const scheme = getColorScheme(s.settings.isDarkSchemeForced ?? false);

		useColorsStore.getState().update(getColors(scheme));
	}
);