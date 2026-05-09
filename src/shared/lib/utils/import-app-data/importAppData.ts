import { writeLocalStorage } from '@shared/lib';

/**
 * Imports application data from a JSON file and saves it to localStorage.
 */
function importAppData(): Promise<boolean> {
	return new Promise((resolve) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';

		input.onchange = async (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];
			if (!file) {
				resolve(false);
				return;
			};

			try {
				const data = await file.text();
				const parsedData = JSON.parse(data) as Record<string, unknown>;

				if (typeof parsedData !== 'object' || parsedData === null) {
					console.error('Invalid JSON format.');
					resolve(false);
					return;
				}

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
		input.click();
	});
}

export { importAppData };