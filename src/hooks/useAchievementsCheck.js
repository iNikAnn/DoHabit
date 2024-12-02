import { useEffect } from "react";

import { useMainDiaryStore } from "../stores/mainDiaryStore";
import { useAchievementsStore } from "../stores/achievementsStore";
import { useDialog } from "../stores/dialogStore";

import useIsInitialRender from "./useIsInitialRender";

function useAchievementsCheck(habits) {

	const isInitialRender = useIsInitialRender();
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const openDialog = useDialog((s) => s.openDialog);

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