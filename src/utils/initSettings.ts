// utils
import { readLocalStorage } from '@shared/lib/utils';

// types
import { Settings } from '../types/settings';

/**
 * Retrieves application settings from localStorage.
 */
function initSettings(): Settings {
	return readLocalStorage<Settings>('settings', {});
}

export default initSettings;