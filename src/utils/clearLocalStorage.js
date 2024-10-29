function clearLocalStorage(url) {
	if (window.confirm('Are you sure you want to delete all application data?')) {
		const input = window.prompt('Enter the phrase "Delete all data".');

		if (input && input.toLowerCase() === 'delete all data') {
			localStorage.clear();
			alert('All data has been successfully removed. The application will now reload.');
			window.location.href = url;
		} else {
			alert('You entered the wrong phrase, operation canceled.');
		};
	};
}

export default clearLocalStorage;