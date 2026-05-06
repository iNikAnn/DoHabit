import { Habit } from '../model/types';

interface Params {
	habits: Habit[];
	newIndex: number;
	currentIndex: number;
}

/**
 * Changes the position of a habit within the list.
 */
function reorderHabit(params: Params): Habit[] {
	const {
		habits: [...habits],
		newIndex,
		currentIndex
	} = params;

	const habit = habits.at(currentIndex);

	if (habit && currentIndex !== newIndex && newIndex >= 0 && newIndex < habits.length) {
		habits.splice(currentIndex, 1);
		habits.splice(newIndex, 0, habit);
	}

	return habits;
}

export default reorderHabit;