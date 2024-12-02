import { useEffect } from "react";
import { useSettingsStore } from "../stores/settingsStore";
import getColors from "../utils/getColors";

function useColors() {
	const settings = useSettingsStore((s) => s.settings);

	const dbColors = getColors(
		settings.isDarkSchemeForced
			? 'dark'
			: matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
	);

	useEffect(
		() => {
			document.documentElement.style.colorScheme = settings.isDarkSchemeForced
				? 'dark'
				: 'light dark';
		},
		[settings]
	);

	return dbColors;
}

export default useColors;