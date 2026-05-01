import saveToLocalStorage from '../../../../utils/saveToLocalStorage';

/**
 * Imports application data from a JSON file and saves it to localStorage.
 */
function importAppData() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';

	input.onchange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		try {
			const data = await file.text();
			const parsedData = JSON.parse(data) as Record<string, unknown>;

			if (typeof parsedData !== 'object' || parsedData === null) {
				window.alert('Invalid JSON format.');
				return;
			}

			for (const key in parsedData) {
				if (!Object.hasOwn(parsedData, key)) continue;

				const value = parsedData[key];
				saveToLocalStorage(key, value);
			}

			window.alert('Data imported successfully! The application will now reload.');
			window.location.href = '/';
		} catch (error) {
			window.alert('Error reading the file.');
			console.error('Error reading the file:', error);
		}
	};

	input.click();
}

export { importAppData };