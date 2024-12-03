import { useLayoutEffect } from "react";
import { useSettingsStore } from "../stores/settingsStore";

function useColorScheme() {
	const settings = useSettingsStore((s) => s.settings);

	useLayoutEffect(
		() => {
			document.documentElement.style.colorScheme = settings.isDarkSchemeForced
				? 'dark'
				: 'light dark';
		},
		[settings]
	);
}

export default useColorScheme;