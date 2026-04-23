/**
 * Permanently deletes all data from localStorage after double confirmation.
 * Redirects the user to the home page upon success.
 */
function clearLocalStorage(): void {
	const CONFIRMATION_PHRASE = 'delete all data';

	const warningMessage =
		'Are you sure you want to delete all application data?\n\n' +
		'This includes:\n' +
		'- All your habits\n' +
		'- All achievements\n' +
		'- All diary entries\n\n' +
		'This action cannot be undone!';

	// First level of protection
	if (!window.confirm(warningMessage)) {
		return;
	}

	// Second level of protection: phrase confirmation
	const userInput = prompt(`To confirm, type "${CONFIRMATION_PHRASE}":`);

	if (userInput?.trim().toLowerCase() === CONFIRMATION_PHRASE) {
		localStorage.clear();
		alert('All data has been successfully removed. The application will now reload.');

		// Redirect to home page to reinitialize the app state
		window.location.href = '/';
	} else {
		alert('Incorrect phrase. Operation canceled.');
	}
}

export default clearLocalStorage;