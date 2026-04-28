import { HabitData } from '../types/habit';

/**
 * Map raw form data to habit properties.
 */
function mapHabitData(data: HabitData) {
	return {
		title: data.title,
		frequency: Number(data.frequency) || 1,
		colorIndex: Number(data.colorIndex) || 0,
		iconTitle: data.iconTitle
	};
}

export default mapHabitData;