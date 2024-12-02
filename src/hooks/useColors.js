import { useEffect } from "react";
import getColors from "../utils/getColors";

function useColors(settings) {
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