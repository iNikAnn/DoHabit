import { writeLocalStorage } from '@shared/lib/local-storage';

/**
 * Opens a file picker to select a JSON file and writes its content to localStorage.
 */
function uploadJsonToStorage(): Promise<boolean> {
	return new Promise((resolve) => {
		// Create a hidden input to trigger the native file picker
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';

		input.onchange = async (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];

			if (!file) {
				resolve(false);
				return;
			}

			try {
				// Read file content as string and parse it
				const data = await file.text();
				const parsedData = JSON.parse(data) as Record<string, unknown>;

				// Make sure data is a valid object
				if (typeof parsedData !== 'object' || parsedData === null) {
					console.error('Invalid JSON format.');
					resolve(false);
					return;
				}

				// Iterate through keys and dump everything into localStorage
				for (const key in parsedData) {
					if (!Object.hasOwn(parsedData, key)) continue;

					const value = parsedData[key];
					writeLocalStorage(key, value);
				}

				resolve(true);
			} catch (error) {
				console.error('Error reading the file:', error);
				resolve(false);
			}
		};

		input.onerror = () => resolve(false);

		// Trigger the picker
		input.click();
	});
}

export { uploadJsonToStorage };