/**
 * Opens a file picker to select a JSON file.
 */
async function uploadJson(): Promise<null | Record<string, unknown>> {
	return new Promise((resolve) => {
		// Create a hidden input to trigger the native file picker
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json'; // eslint-disable-line

		input.onchange = async (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];

			if (!file) {
				resolve(null);
				return;
			}

			try {
				// Read file content as string and parse it
				const data = await file.text();
				const parsedData = JSON.parse(data) as Record<string, unknown>;

				// Make sure data is a valid object
				if (typeof parsedData !== 'object' || parsedData === null) {
					console.error('Invalid JSON format.');
					resolve(null);
					return;
				}

				resolve(parsedData);
			} catch (error) {
				console.error('Error reading the file:', error);
				resolve(null);
			}
		};

		input.oncancel = () => resolve(null);
		input.onerror = () => resolve(null);

		// Trigger the picker
		input.click();
	});
}

export { uploadJson };