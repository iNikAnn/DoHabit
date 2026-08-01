import { t } from 'i18next';
import { set } from 'idb-keyval';
import { uploadJson } from '../lib/uploadJson';
import { clearAppData } from '@features/data-management/clear-data';
import { STORAGE_KEYS } from '@shared/const';
import { decryptJsonWithPassword, isEncryptedBackup } from '@shared/lib/crypto';
import { dialogStore, PasswordForm } from '@shared/ui';

/**
 * Safely imports application backup data from a JSON file.
 * Encrypted backups are detected automatically and prompt for their password.
 */
async function importAppData() {
	let parsedData = await uploadJson();

	if (!parsedData) {
		window.alert(t('menu.dataManagement.backup.import.notifications.error'));
		return;
	}

	// Decrypt password-protected backups before importing
	if (isEncryptedBackup(parsedData)) {
		const password = await new Promise<string | null>((resolve) => {
			dialogStore.getState().open({
				title: t('menu.dataManagement.backup.import.dialogs.passwordPrompt.title'),
				subTitle: t('menu.dataManagement.backup.import.dialogs.passwordPrompt.desc'),
				children: (
					<PasswordForm
						onSubmit={(pwd) => resolve(pwd || null)}
						onClose={() => resolve(null)}
					/>
				)
			});
		});

		if (!password) return;

		try {
			parsedData = JSON.parse(
				await decryptJsonWithPassword(parsedData, password)
			) as Record<string, unknown>;
		} catch {
			window.alert(t('menu.dataManagement.backup.import.notifications.wrongPassword'));
			return;
		}
	}

	// Wipe old data first so migrations handle legacy backups correctly
	await clearAppData({ skipConfirmation: true, skipRedirect: true });

	// Write all storage keys concurrently
	const modernKeys = new Set<string>(Object.values(STORAGE_KEYS));

	const uploadPromises = Object.entries(parsedData).map(([key, value]) => {
		// TODO: Remove this legacy fallback block on release version
		const isModernKey = modernKeys.has(key);

		if (isModernKey) {
			return set(key, value);
		}

		// Fallback for legacy backups to trigger native runtime migrations
		localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
		return Promise.resolve();
	});

	await Promise.all(uploadPromises);

	// Notify user and force a reload to apply changes across the app
	window.alert(t('menu.dataManagement.backup.import.notifications.success'));
	window.location.href = import.meta.env.BASE_URL;
}

export { importAppData };