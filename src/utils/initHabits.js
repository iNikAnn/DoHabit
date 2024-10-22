// utils
import getFromLocalStorage from './getFromLocalStorage';
import saveToLocalStorage from './saveToLocalStorage';
import removeIncompleteDays from './removeIncompleteDays';

function initHabits() {
	let habits = getFromLocalStorage('habits', []);

	if (!habits.length) return habits;

	habits = habits.map(
		(h) => {
			const newH = { ...h };

			if (newH.frequency && Array.isArray(newH.completedDays)) {
				// remove incomplete days before today with progress less than habit frequency
				newH.completedDays = removeIncompleteDays(newH.completedDays, newH.frequency);
			};

			return newH;
		}
	);

	saveToLocalStorage('habits', habits);

	return habits;
}

export default initHabits;