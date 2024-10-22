function getFromLocalStorage(key, initialValue) {
	let data;

	try {
		const json = localStorage.getItem(key);
		data = json ? JSON.parse(json) : initialValue;
	}
	catch (error) {
		console.error('Error retrieving data from localStorage:', error);
		data = initialValue;
	};

	return data;
}

export default getFromLocalStorage;