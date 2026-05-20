import { habitsStore } from '@entities/habit';

const msg = 'Are you sure you want to archive this habit? Archived habits can be found in the menu under the \'Archive\' section.';

/**
 * Archives a habit and executes a success callback.
 *
 * Shows a confirmation dialog before changing the habit's status.
 */
function archiveHabit(habitId: string, onSuccess?: () => void) {
	const habitsDispatch = habitsStore.getState().habitsDispatch;

	if (window.confirm(msg)) {
		habitsDispatch({
			type: 'setHabitArchiveStatus',
			payload: { habitId, isArchived: true }
		});

		onSuccess?.();
	}
}

export { archiveHabit };