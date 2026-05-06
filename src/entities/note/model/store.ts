import { create } from 'zustand';
import { NoteState } from './types';
import initNotes from './init';
import { notesReducer } from './reducer';

/**
 * Note store providing state and a dispatch function.
 */
export const useNotesStore = create<NoteState>(
	(set) => ({
		notes: initNotes(),

		notesDispatch: (actions) => set(
			(s) => ({ notes: notesReducer(s.notes, actions) })
		)
	})
);