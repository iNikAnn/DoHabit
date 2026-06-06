import i18n from 'i18next';
import { uploadJson } from '../lib/uploadJson';

/**
 * Orchestrates the application data import process.
 */
async function importAppData() {
	const res = await uploadJson();

	if (res) {
		// Notify user and force a reload to apply changes across the app
		window.alert(i18n.t('menu.dataManagement.backup.import.notifications.success'));
		window.location.href = import.meta.env.BASE_URL;
	} else {
		window.alert(i18n.t('menu.dataManagement.backup.import.notifications.error'));
	}
}

export { importAppData };