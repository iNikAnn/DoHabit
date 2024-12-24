/**
 * Clears the local storage of the application after user confirmation.
 *
 * @param {string} redirectUrl - The URL to redirect to after clearing the local storage.
 * @throws {TypeError} - If the provided redirectUrl is not a string.
 */

function clearLocalStorage(redirectUrl) {
	if (typeof redirectUrl !== 'string') {
		throw new TypeError('The redirect URL must be a string.');
	};

	if (window.confirm('Are you sure you want to delete all application data?')) {
		const input = window.prompt('Enter the phrase "Delete all data".');

		if (input && input.toLowerCase() === 'delete all data') {
			localStorage.clear();
			alert('All data has been successfully removed. The application will now reload.');
			window.location.href = redirectUrl;
		} else {
			alert('You entered the wrong phrase, operation canceled.');
		};
	};
}

export default clearLocalStorage;