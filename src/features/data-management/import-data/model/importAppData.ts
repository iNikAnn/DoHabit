import { uploadJsonToStorage } from '@shared/lib';

// @ts-ignore
const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';

/**
 * Orchestrates the application data import process.
 */
async function importAppData() {
	const res = await uploadJsonToStorage();

	if (res) {
		// Notify user and force a reload to apply changes across the app
		window.alert('Data imported successfully! The application will now reload.');
		window.location.href = PUBLIC_URL;
	} else {
		window.alert('Something went wrong during import.');
	}
}

export { importAppData };