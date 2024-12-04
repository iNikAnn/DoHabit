import { useEffect } from 'react';

import { useAchievementsStore } from '../stores/achievementsStore';
import { useHabitsStore } from '../stores/habitsStore';
import { useMainDiaryStore } from '../stores/mainDiaryStore';
import { useDialogStore } from '../stores/dialogStore';

import useIsInitialRender from './useIsInitialRender';

function useAchievementsCheck() {

	const isInitialRender = useIsInitialRender();
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const habits = useHabitsStore((s) => s.habits);
	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const openDialog = useDialogStore((s) => s.open);

	useEffect(
		() => {
			achievementsDispatch({
				habits,
				mainDiary,
				onOpenDialog: openDialog,
				isInitialRender: isInitialRender.current
			});
		},
		[achievementsDispatch, habits, isInitialRender, mainDiary, openDialog]
	);
}

export default useAchievementsCheck;