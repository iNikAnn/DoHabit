import { create } from 'zustand';

import initHabits from '../utils/initHabits';
import habitsReducer from '../utils/habitsReducer';

export const useHabitsStore = create(
	(set) => ({
		habits: initHabits(),

		habitsDispatch: (actions) => set(
			(s) => ({ habits: habitsReducer(s.habits, actions) })
		)
	})
);