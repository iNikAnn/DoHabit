import { clearLocalStorage } from '@shared/lib/local-storage';

const warningMessage =
	'Are you sure you want to delete all application data?\n\n' +
	'This includes:\n' +
	'- All your habits\n' +
	'- All achievements\n' +
	'- All diary entries\n\n' +
	'This action cannot be undone!';

/**
 * Completely wipes user app data.
 * Requires double confirmation (dialog + manual typing) to prevent accidental loss.
 * Redirects to home page on success.
 */
function clearAppData() {
	// 1: confirmation dialog
	if (window.confirm(warningMessage)) {
		const userInput = prompt('To confirm, type: "delete data":');

		// 2: manual input check
		if (userInput?.trim().toLowerCase() === 'delete data') {
			clearLocalStorage();

			alert('All data has been successfully removed. The application will now reload.');

			// Hard redirect to clear state and refresh the app
			window.location.href = import.meta.env.BASE_URL;
		} else {
			alert('Action canceled or incorrect phrase.');
		}
	}
}

export { clearAppData };