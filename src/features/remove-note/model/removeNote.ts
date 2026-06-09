import { t } from 'i18next';
import { notesStore, type DeleteNote } from '@entities/note';

type NoteId = DeleteNote['payload']['noteId'];

/**
 * Delete single or multiple notes with confirmation.
 */
function removeNote(noteId: NoteId, onSuccess?: () => void) {
	const notesDispatch = notesStore.getState().notesDispatch;

	if (window.confirm(t('notes.dialogs.deleteConfirm'))) {
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