import { useEffect } from 'react';

import { useAchievementsStore } from '../stores/achievementsStore';
import { useIsFirstRender } from '@shared/lib';
import { useDialogStore } from '@shared/ui';
import { useHabitsStore } from '@entities/habit';
import { useNotesStore } from '@entities/note';

/**
 * Hook to trigger achievement synchronization on data changes.
 */
function useAchievementsCheck(): void {

	const isInitialRender = useIsFirstRender();
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const habits = useHabitsStore((s) => s.habits);
	const mainDiary = useNotesStore((s) => s.notes);
	const openDialog = useDialogStore((s) => s.open);

	useEffect(
		() => {
			achievementsDispatch({
				habits,
				mainDiary,
				onUnlock: openDialog,
				isInitialRender: isInitialRender
			});
		},
		[achievementsDispatch, habits, isInitialRender, mainDiary, openDialog]
	);
}

export default useAchievementsCheck;
