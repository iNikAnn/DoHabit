function getFromLocalStorage(key) {
	let data;

	try {
		const json = localStorage.getItem(key);
		data = JSON.parse(json);
	}
	catch (error) {
		console.error('Error retrieving data from localStorage:', error);
	};

	return data;
}

export default getFromLocalStorage;