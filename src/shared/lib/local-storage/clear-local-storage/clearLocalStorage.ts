/**
 * Deletes specified keys or all data from localStorage.
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