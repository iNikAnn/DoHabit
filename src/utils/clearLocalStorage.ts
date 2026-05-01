interface ClearLocalStorageOptions {
	keys?: string | string[];
	warningMessage?: string;
}

/**
 * Deletes specified keys or all data from localStorage after double confirmation.
 * Redirects the user to the home page upon success.
 */
function clearLocalStorage(options: ClearLocalStorageOptions): void {
	const {
		keys,
		warningMessage = keys
			? 'Are you sure you want to delete selected data?'
			: 'Are you sure you want to delete ALL application data?'
	} = options;

	const CONFIRMATION_PHRASE = 'delete data';

	// First level of protection
	if (!window.confirm(warningMessage)) {
		return;
	}

	// Second level of protection: phrase confirmation
	const userInput = prompt(`To confirm, type "${CONFIRMATION_PHRASE}":`);

	if (userInput?.trim().toLowerCase() === CONFIRMATION_PHRASE) {
		if (keys) {
			const items = Array.isArray(keys) ? keys : [keys];
			items.forEach((key) => localStorage.removeItem(key));
		} else {
			localStorage.clear();
		}

		alert('All data has been successfully removed. The application will now reload.');

		// Redirect to home page to reinitialize the app state
		window.location.href = '/';
	} else {
		alert('Action canceled or incorrect phrase.');
	}
}

export default clearLocalStorage;