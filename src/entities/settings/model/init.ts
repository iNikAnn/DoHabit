import { Settings } from './types';
import { readLocalStorage } from '@shared/lib';

/**
 * Retrieves application settings from localStorage.
 */
function initSettings(): Settings {
	return readLocalStorage<Settings>('settings', {});
}

export { initSettings };