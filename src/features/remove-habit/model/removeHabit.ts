import { habitsStore } from '@entities/habit';
import { notesStore } from '@entities/note';

const msg = 'Are you sure you want to delete this habit? Deleted data cannot be recovered.';

/**
 * Deletes a habit and all associated notes.
 *
 * Triggers confirmation before performing the deletion.
 */
function removeHabit(habitId: string, onSuccess?: () => void) {
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