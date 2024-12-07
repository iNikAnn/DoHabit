import { create } from "zustand";

import initAchievements from "../utils/initAchievements";
import achievementsReducer from "../utils/achievementsReducer";

export const useAchievementsStore = create(
	(set) => ({
		achievements: initAchievements(),

		achievementsDispatch: (actions) => set(
			(s) => ({ achievements: achievementsReducer(s.achievements, actions) })
		)
	})
);