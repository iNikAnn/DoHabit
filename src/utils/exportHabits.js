function exportHabits(habits) {
	const jsonStr = JSON.stringify(habits);
	const blob = new Blob([jsonStr], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = 'DoHabit_Habits_' + new Date().toLocaleString().replace(/\W/g, '_') + '.json';
	link.click();

	URL.revokeObjectURL(url);
}

export default exportHabits;