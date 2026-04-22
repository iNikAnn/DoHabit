// utils
import getFromLocalStorage from './getFromLocalStorage';

// types
import { Note } from '../types/habit';

/**
 * Loads the main diary notes from localStorage.
 */
function initMainDiary(): Note[] {
	return getFromLocalStorage<Note[]>('mainDiary', []);
}

export default initMainDiary;