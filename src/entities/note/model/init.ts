import { Note } from './types';
import { readLocalStorage } from '@shared/lib';

/**
 * Loads diary notes from localStorage.
 */
function initNotes(): Note[] {
	return readLocalStorage<Note[]>('diary', []);
}

export default initNotes;