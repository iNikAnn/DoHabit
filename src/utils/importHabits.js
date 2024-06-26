function importHabits(onUpdate) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.json';

	input.onchange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const content = await file.text();
			const importedData = JSON.parse(content);

			onUpdate({
				type: 'importHabit',
				importedData
			});

			window.alert('Habits imported successfully!');
		} catch (error) {
			console.error('Error reading the file:', error);
		};
	};

	input.click();
}

export default importHabits;