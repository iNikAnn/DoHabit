import saveToLocalStorage from './saveToLocalStorage';

function importAllData() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';

	input.onchange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const data = await file.text();
			const parsedData = JSON.parse(data);

			for (const key in parsedData) {
				if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
					const value = JSON.parse(parsedData[key]);
					saveToLocalStorage(key, value);
				};
			};

			window.alert('Data imported successfully! The application will now reload.');
			window.location.href = process.env.PUBLIC_URL;
		} catch (error) {
			window.alert('Error reading the file.');
			console.error('Error reading the file:', error);
		};
	};

	input.click();
}

export default importAllData;