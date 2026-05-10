import { create } from 'zustand';
import { ColorsState } from '../types/colorScheme';
import { useSettingsStore } from '@entities/settings';
import { generateBaseColors, resolveTheme } from '@shared/lib';

/**
 * Colors Store.
 * Manages the application's color palette based on the current color scheme.
 */
export const useColorsStore = create<ColorsState>(
	(set) => ({
		colors: generateBaseColors(
			resolveTheme(useSettingsStore.getState().settings.isDarkSchemeForced ?? false)
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
		const scheme = resolveTheme(s.settings.isDarkSchemeForced ?? false);

		useColorsStore.getState().update(generateBaseColors(scheme));
	}
);