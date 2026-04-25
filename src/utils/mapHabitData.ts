import { HabitFormData } from '../types/habit';

function mapHabitData(data: HabitFormData) {
	return {
		title: data.title.value,
		frequency: Number(data.frequency.value),
		colorIndex: Number(data.colorIndex.value),
		iconTitle: data.iconTitle.value
	};
}

export default mapHabitData;