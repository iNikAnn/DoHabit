import { create } from "zustand";

import initSettings from "../utils/initSettings";
import settingsReducer from "../utils/settingsReducer";

export const useSettingsStore = create(
	(set) => ({
		settings: initSettings(),

		settingsDispatch: (actions) => set(
			(s) => ({ settings: settingsReducer(s.settings, actions) })
		)
	})
);