import { useEffect } from "react";
import { useMainDiaryStore } from "../stores/mainDiaryStore";
import { useAchievementsStore } from "../stores/achievementsStore";
import useIsInitialRender from "./useIsInitialRender";

function useAchievementsCheck(habits, setDialog) {

	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const isInitialRender = useIsInitialRender();

	useEffect(
		() => {
			achievementsDispatch({
				habits,
				mainDiary,
				onOpenDialog: setDialog,
				isInitialRender: isInitialRender.current
			});
		},
		[achievementsDispatch, habits, isInitialRender, mainDiary, setDialog]
	);
}

export default useAchievementsCheck;