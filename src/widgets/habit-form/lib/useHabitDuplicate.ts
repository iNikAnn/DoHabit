import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { checkHabitTitleExistence, Habit } from '@entities/habit';

/**
 * Hook to check if a habit with the same title already exists.
 */
function useHabitDuplicate(
	habits: Habit[],
	currentTitle: string,
	initialHabit?: Habit
): boolean {
	const [isDuplicate, setIsDuplicate] = useState(false);
	const debouncedTitle = useDebounce(currentTitle, 1000);

	useEffect(() => {
		setIsDuplicate(
			checkHabitTitleExistence(habits, debouncedTitle, initialHabit)
		);
	}, [debouncedTitle, habits, initialHabit]);

	return isDuplicate;
}

export default useHabitDuplicate;