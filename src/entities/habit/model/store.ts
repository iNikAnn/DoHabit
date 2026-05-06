import { create } from 'zustand';
import { HabitState } from './types';
import initHabits from './init';
import habitsReducer from './reducer';

/**
 * Habits store providing state and a dispatch function.
 */
export const useHabitsStore = create<HabitState>(
	(set) => ({
		habits: initHabits(),

		habitsDispatch: (action) => set(
			(s) => ({ habits: habitsReducer(s.habits, action) })
		)
	})
);