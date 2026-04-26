// utils
import getFromLocalStorage from './getFromLocalStorage';

// types
import { Settings } from '../types/settings';

/**
 * Retrieves application settings from localStorage.
 */
function initSettings(): Settings {
	return getFromLocalStorage<Settings>('settings', {});
}

export default initSettings;