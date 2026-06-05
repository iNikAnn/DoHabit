import i18n from 'i18next';
import { clearLocalStorage } from '@shared/lib/local-storage';

/**
 * Completely wipes user app data.
 * Requires double confirmation (dialog + manual typing) to prevent accidental loss.
 * Redirects to home page on success.
 */
function clearAppData() {
	// 1: confirmation dialog
	if (window.confirm(i18n.t('settings.data-management.clearAllConfirm', { joinArrays: '\n' } as any))) {
		const userInput = prompt(i18n.t('settings.data-management.clearAllPrompt'));

		// 2: manual input check
		if (userInput?.trim().toLowerCase() === 'delete data') {
			clearLocalStorage();

			alert(i18n.t('settings.data-management.clearAllSuccess'));

			// Hard redirect to clear state and refresh the app
			window.location.href = import.meta.env.BASE_URL;
		} else {
			alert(i18n.t('settings.data-management.clearAllError'));
		}
	}
}

export { clearAppData };