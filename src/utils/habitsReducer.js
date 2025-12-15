// src/utils/habitsReducer.js
import updateHabitProgress from './updateHabitProgress';

export default function habitsReducer(state, action) {
  switch (action.type) {
    case 'ADD_HABIT':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.title,
          frequency: action.frequency,
          completedDays: [], // always an array
        },
      ];

    case 'DELETE_HABIT':
      return state.filter((h) => h.id !== action.id);

    case 'TOGGLE_HABIT':
      return updateHabitProgress(state, action.title);

    case 'RESET_ALL':
      return [];

    default:
      return state;
  }
}
