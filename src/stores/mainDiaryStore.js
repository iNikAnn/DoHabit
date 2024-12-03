import { create } from "zustand";

import initMainDiary from "../utils/initMainDiary";
import mainDiaryReducer from "../utils/mainDiaryReducer";

export const useMainDiaryStore = create(
	(set) => ({
		mainDiary: initMainDiary(),

		mainDiaryDispatch: (actions) => set(
			(s) => ({ mainDiary: mainDiaryReducer(s.mainDiary, actions) })
		)
	})
);