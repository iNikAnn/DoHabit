import { create } from 'zustand';
import { DiaryState } from './types';
import initDiary from './init';
import diaryReducer from './reducer';

/**
 * Diary store providing state and a dispatch function.
 */
export const useDiaryStore = create<DiaryState>(
	(set) => ({
		diary: initDiary(),

		diaryDispatch: (actions) => set(
			(s) => ({ diary: diaryReducer(s.diary, actions) })
		)
	})
);