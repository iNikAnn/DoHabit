import { notesStore, type DeleteNote } from '@entities/note';

type NoteId = DeleteNote['payload']['noteId'];

/**
 * Delete single or multiple notes with confirmation.
 */
function removeNote(noteId: NoteId, onSuccess?: () => void) {
	const notesDispatch = notesStore.getState().notesDispatch;

	if (window.confirm('Are you sure you want to delete this note(s)?')) {
		notesDispatch({
			type: 'deleteNote',
			payload: {
				noteId: noteId
			}
		});

		onSuccess?.();
	}
}

export { removeNote };