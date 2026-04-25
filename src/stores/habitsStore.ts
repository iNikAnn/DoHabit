import { create } from 'zustand';

// types
import { HabitState } from '../types/habit';

// utils
import initHabits from '../utils/initHabits';
import habitsReducer from '../utils/habitsReducer';

export const useHabitsStore = create<HabitState>(
	(set) => ({
		habits: initHabits(),

		habitsDispatch: (action) => set(
			(s) => ({ habits: habitsReducer(s.habits, action) })
		)
	})
);