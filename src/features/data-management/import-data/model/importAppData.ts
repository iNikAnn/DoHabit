import { uploadJson } from '../lib/uploadJson';

/**
 * Orchestrates the application data import process.
 */
async function importAppData() {
	const res = await uploadJson();

	if (res) {
		// Notify user and force a reload to apply changes across the app
		window.alert('Data imported successfully! The application will now reload.');
		window.location.href = import.meta.env.BASE_URL;
	} else {
		window.alert('Something went wrong during import.');
	}
}

export { importAppData };