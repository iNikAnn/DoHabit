// utils
import getFromLocalStorage from './getFromLocalStorage';

// types
import { Settings } from '../types/common';

/**
 * Retrieves application settings from localStorage.
 */
function initSettings(): Settings {
	return getFromLocalStorage<Settings>('settings', {});
}

export default initSettings;