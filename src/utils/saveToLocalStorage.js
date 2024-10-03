function saveToLocalStorage(key, data) {
	setTimeout(() => {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error('Error saving to localStorage:', error);
		};
	}, 0);
}

export default saveToLocalStorage;