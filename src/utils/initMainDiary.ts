// utils
import { readLocalStorage } from '@shared/lib';

// types
import { Note } from '../types/diary';

/**
 * Loads the main diary notes from localStorage.
 */
function initMainDiary(): Note[] {
	return readLocalStorage<Note[]>('mainDiary', []);
}

export default initMainDiary;