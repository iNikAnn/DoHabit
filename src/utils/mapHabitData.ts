import { HabitFormData } from '../types/habit';

/**
 * Map raw form data to habit properties.
 */
function mapHabitData(data: HabitFormData) {
	return {
		title: data.title.value,
		frequency: Number(data.frequency.value) || 1,
		colorIndex: Number(data.colorIndex.value) || 0,
		iconTitle: data.iconTitle.value
	};
}

export default mapHabitData;