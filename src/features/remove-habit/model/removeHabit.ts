import i18n from 'i18next';
import { habitsStore } from '@entities/habit';
import { notesStore } from '@entities/note';

/**
 * Deletes a habit and all associated notes.
*
* Triggers confirmation before performing the deletion.
*/
function removeHabit(habitId: string, onSuccess?: () => void) {
	const msg = i18n.t('habits.dialogs.deleteConfirm')

	const habitsDispatch = habitsStore.getState().habitsDispatch;
	const notesDispatch = notesStore.getState().notesDispatch;

	if (window.confirm(msg)) {
		const payload = { habitId };

		habitsDispatch({ type: 'deleteHabit', payload });
		notesDispatch({ type: 'deleteHabitNotes', payload });

		onSuccess?.();
	}
}

export { removeHabit };