import { t } from 'i18next';
import { clear as clearIdb } from 'idb-keyval';
import { clearLocalStorage } from '@shared/lib/local-storage';

interface ClearAppDataOptions {
	/** Skip confirmation dialogs and prompt checks. */
	skipConfirmation?: boolean;

	/** Prevent hard redirect after data clearance. */
	skipRedirect?: boolean;
}

const CONFIRM_PHRASE = 'delete data';

/**
 * Completely wipes user app data.
 * Requires double confirmation (dialog + manual typing) to prevent accidental loss.
 * Redirects to home page on success.
 */
async function clearAppData(options?: ClearAppDataOptions) {
	const {
		skipConfirmation = false,
		skipRedirect = false
	} = options ?? {};

	if (!skipConfirmation) {
		// 1. Confirmation dialog
		if (!window.confirm(t('menu.dataManagement.danger.clearAll.dialogs.confirm'))) {
			return;
		}

		const userInput = prompt(t('menu.dataManagement.danger.clearAll.dialogs.prompt', {
			phrase: CONFIRM_PHRASE
		}));

		// 2. Manual input check
		if (userInput?.trim().toLowerCase() !== CONFIRM_PHRASE) {
			alert(t('menu.dataManagement.danger.clearAll.notifications.error'));
			return;
		}
	}

	clearLocalStorage();
	await clearIdb();

	if (!skipRedirect) {
		alert(t('menu.dataManagement.danger.clearAll.notifications.success'));

		// Hard redirect to clear state and refresh the app
		window.location.href = import.meta.env.BASE_URL;
	}
}

export { clearAppData };