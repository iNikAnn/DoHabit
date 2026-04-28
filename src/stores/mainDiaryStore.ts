import { create } from 'zustand';

// types
import { MainDiaryState } from '../types/diary';

// utils
import initMainDiary from '../utils/initMainDiary';
import mainDiaryReducer from '../utils/mainDiaryReducer';

/**
 * Main diary store providing state and a dispatch function.
 */
export const useMainDiaryStore = create<MainDiaryState>(
	(set) => ({
		mainDiary: initMainDiary(),

		mainDiaryDispatch: (actions) => set(
			(s) => ({ mainDiary: mainDiaryReducer(s.mainDiary, actions) })
		)
	})
);