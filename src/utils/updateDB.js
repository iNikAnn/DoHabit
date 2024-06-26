// utils
import getFormattedDate from './getFormattedDate';

function updateDB(data, dbColors) {
	return JSON.parse(data).map((habit) => {
		let updatedHabit = { ...habit };

		// update color
		if (habit.color) {
			const colorIndex = Math.max(0, dbColors.indexOf(habit.color));

			delete updatedHabit.color;
			updatedHabit.colorIndex = colorIndex;
		};

		// add frequency
		if (!habit.frequency) {
			updatedHabit.frequency = 1;
		};

		// update completedDays array
		updatedHabit.completedDays = updatedHabit.completedDays.map((el) => {
			if (typeof el === 'string') {
				return {
					date: el,
					progress: 1
				};
			};

			return { ...el };
		});

		// convert string to number
		if (updatedHabit.colorIndex && typeof updatedHabit.colorIndex === 'string') {
			updatedHabit.colorIndex = Number(updatedHabit.colorIndex);
		};

		if (updatedHabit.frequency && typeof updatedHabit.frequency === 'string') {
			updatedHabit.frequency = Number(updatedHabit.frequency);
		};

		// remove incomplete days before today with progress less than habit frequency
		const today = new Date(getFormattedDate(new Date()));

		updatedHabit.completedDays = updatedHabit.completedDays.filter((day) => {
			return !(new Date(day.date) < today && day.progress < habit.frequency);
		});

		return updatedHabit;
	});
}

export default updateDB;