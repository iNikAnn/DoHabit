/**
 * Retrieves a value from localStorage by key. If the key does not exist or
 * an error occurs during retrieval, it returns the provided initial value.
 *
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @param {*} initialValue - The value to return if the key does not exist
 *                           or if an error occurs. Can be of any type.
 * @returns {*} - The retrieved value from localStorage or the initial value.
 * @throws {TypeError} - If the key is not a string.
 */

function getFromLocalStorage(key, initialValue) {
	if (typeof key !== 'string') {
		throw new TypeError('The key must be a string.');
	};

	let data;
	try {
		const json = localStorage.getItem(key);
		data = json ? JSON.parse(json) : initialValue;
	} catch (error) {
		console.error('Error retrieving data from localStorage:', error);
		data = initialValue;
	};

	return data;
}

export default getFromLocalStorage;