import styles from '../../css/WeekdayChart.module.css';

import { BarElement, Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";

// utils
import getCompletionCountPerDay from '../../utils/getCompletionCountPerDay';

ChartJS.register(BarElement);

function WeekdayChart({ options, habit, color }) {
	const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const data = getCompletionCountPerDay(habit.completedDays, habit.frequency);

	const config = {
		data: {
			labels: [...WEEKDAYS.slice(1), 'Sun'],
			datasets: [{
				label: 'WeekdayChart',
				data: [...data.slice(1), data[0]],

				backgroundColor: color,
				borderRadius: 10,
				borderSkipped: false
			}]
		},

		options
	};

	return (
		<Bar {...config} />
	);
}

export default WeekdayChart;