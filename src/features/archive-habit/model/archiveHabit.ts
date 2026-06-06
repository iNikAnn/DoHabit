import i18n from 'i18next';
import { habitsStore } from '@entities/habit';

/**
 * Archives a habit and executes a success callback.
 *
 * Shows a confirmation dialog before changing the habit's status.
 */
function archiveHabit(habitId: string, onSuccess?: () => void) {
	const habitsDispatch = habitsStore.getState().habitsDispatch;

	if (window.confirm(i18n.t('habits.dialogs.archiveConfirm'))) {
		habitsDispatch({
			type: 'setHabitArchiveStatus',
			payload: { habitId, isArchived: true }
		});

		onSuccess?.();
	}
}

export { archiveHabit };