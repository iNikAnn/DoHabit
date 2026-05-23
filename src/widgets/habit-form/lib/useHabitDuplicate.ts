import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { checkHabitTitleExistence, type Habit } from '@entities/habit';

/**
 * Hook to check if a habit with the same title already exists.
 */
function useHabitDuplicate(
	habits: Habit[],
	currentTitle: string,
	isSubmitting: boolean,
	initialHabit?: Habit
): boolean {
	const [isDuplicate, setIsDuplicate] = useState(false);
	const debouncedTitle = useDebounce(currentTitle, 1000);

	useEffect(() => {
		if (isSubmitting) return;

		setIsDuplicate(
			checkHabitTitleExistence(habits, debouncedTitle, initialHabit)
		);
	}, [debouncedTitle, habits, initialHabit, isSubmitting]);

	return isDuplicate;
}

export default useHabitDuplicate;