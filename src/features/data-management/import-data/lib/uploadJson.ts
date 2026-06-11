import { set } from 'idb-keyval';
import { STORAGE_KEYS } from '@shared/const';

/**
 * Opens a file picker to select a JSON file and writes its content to localStorage.
 */
async function uploadJson(): Promise<boolean> {
	return new Promise((resolve) => {
		// Create a hidden input to trigger the native file picker
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json'; // eslint-disable-line

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

				// Write all storage keys concurrently
				const modernKeys = new Set<string>(Object.values(STORAGE_KEYS));

				const uploadPromises = Object.entries(parsedData).map(([key, value]) => {
					// TODO: Remove this legacy fallback block on release version
					const isModernKey = modernKeys.has(key);

					if (isModernKey) {
						return set(key, value);
					}

					// Fallback for legacy backups to trigger native runtime migrations
					localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
				});

				await Promise.all(uploadPromises);

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

export { uploadJson };