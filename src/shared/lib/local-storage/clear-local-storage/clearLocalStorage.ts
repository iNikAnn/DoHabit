/**
 * Deletes specified keys or all data from localStorage after double confirmation.
 * Redirects the user to the home page upon success.
 */
function clearLocalStorage(keys?: string | string[]): void {
	if (keys) {
		const items = Array.isArray(keys) ? keys : [keys];
		items.forEach((key) => localStorage.removeItem(key));
	} else {
		localStorage.clear();
	}
}

export { clearLocalStorage };