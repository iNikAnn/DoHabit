import styles from '../../css/MonthlyChart.module.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";

// utils
import getCompletionCountPerMonth from '../../utils/getCompletionCountPerMonth';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

function MonthlyChart({ options, habit, color }) {
	const MONTHS = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	const data = getCompletionCountPerMonth(habit.completedDays, habit.frequency);

	const config = {
		data: {
			labels: MONTHS,
			datasets: [{
				label: 'MonthlyChart',
				data,

				pointBackgroundColor: '#e6e6e6',
				pointBorderWidth: 0,

				borderColor: color,
				// borderWidth: 1,
				tension: .4,

				backgroundColor: (context) => {
					if (!context.chart.chartArea) return;

					const { ctx, chartArea: { top, bottom } } = context.chart;
					const bg = ctx.createLinearGradient(0, top, 0, bottom);

					bg.addColorStop(0, color);
					bg.addColorStop(1, 'transparent');

					return bg;
				},

				fill: true,
			}]
		},

		options
	};

	return (
		<Line {...config} />
	);
}

export default MonthlyChart;