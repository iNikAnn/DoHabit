import { t } from 'i18next';
import { clearLocalStorage } from '@shared/lib/local-storage';

const CONFIRM_PHRASE = 'delete data';

/**
 * Completely wipes user app data.
 * Requires double confirmation (dialog + manual typing) to prevent accidental loss.
 * Redirects to home page on success.
 */
function clearAppData() {
	// 1: confirmation dialog
	if (window.confirm(t('menu.dataManagement.danger.clearAll.dialogs.confirm'))) {
		const userInput = prompt(t('menu.dataManagement.danger.clearAll.dialogs.prompt', {
			phrase: CONFIRM_PHRASE
		}));

		// 2: manual input check
		if (userInput?.trim().toLowerCase() === CONFIRM_PHRASE) {
			clearLocalStorage();

			alert(t('menu.dataManagement.danger.clearAll.notifications.success'));

			// Hard redirect to clear state and refresh the app
			window.location.href = import.meta.env.BASE_URL;
		} else {
			alert(t('menu.dataManagement.danger.clearAll.notifications.error'));
		}
	}
}

export { clearAppData };