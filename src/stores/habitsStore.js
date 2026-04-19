// src/stores/habitsStore.js
import { create } from 'zustand';

import initHabits from '../utils/initHabits';
import habitsReducer from '../utils/habitsReducer';

export const useHabitsStore = create((set) => ({
  habits: initHabits(),

  habitsDispatch: (action) =>
    set((state) => ({
      habits: habitsReducer(state.habits, action),
    })),
}));
