/**
 * Retrieves and parses a value from localStorage or returns a default value.
 */
function getFromLocalStorage<T>(key: string): T | undefined;
function getFromLocalStorage<T>(key: string, initialValue: T): T;
function getFromLocalStorage<T>(key: string, initialValue?: T): T | undefined {
	try {
		const json = localStorage.getItem(key);
		return json ? JSON.parse(json) : initialValue;
	} catch (error) {
		console.error('Error retrieving data from localStorage:', error);
		return initialValue;
	}
}

export default getFromLocalStorage;