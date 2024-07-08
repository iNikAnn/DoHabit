// utils
import getCurrentStreak from '../../utils/getCurrentStreak';
import getLongestStreak from '../../utils/getLongestStreak';

// chart js
import { BarElement, Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

function StreakChart({ options, habit, color }) {
	const currentStreak = getCurrentStreak(habit.completedDays, habit.frequency);
	const longestStreak = getLongestStreak(habit.completedDays, habit.frequency);

	const config = {
		data: {
			labels: ['Current', 'Longest'],
			datasets: [{
				label: 'WeekdayChart',
				data: [currentStreak, longestStreak],

				backgroundColor: color,
				borderRadius: 10,
				borderSkipped: false
			}]
		},

		options: {
			...options,
			indexAxis: 'y'
		}
	};

	return (
		<Bar {...config} />
	);
}

export default StreakChart;