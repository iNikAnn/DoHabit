import styles from '../../css/MonthBlock.module.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, layouts } from "chart.js";
import { Line } from "react-chartjs-2";

// icons
import { FaCalendarAlt } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

function MonthBlock({ color, dimmedColor, lightDimmedColor }) {
	const MONTHS = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	const config = {
		type: 'line',

		data: {
			labels: MONTHS,
			datasets: [{
				label: 'TEST LABEL',
				data: [0, 0, 1, 6, 9, 4, 1, 5, 3, 5, 2, 1],

				pointBackgroundColor: '#e6e6e6',
				pointBorderWidth: 0,

				borderColor: color,
				// borderWidth: 1,
				tension: .4,

				backgroundColor: (context) => {
					if (!context.chart.chartArea) return;

					const { ctx, data, chartArea: { top, bottom } } = context.chart;
					const bg = ctx.createLinearGradient(0, top, 0, bottom);

					bg.addColorStop(0, color);
					bg.addColorStop(1, 'transparent');

					return bg;
				},


				fill: true,
			}]
		},

		options: {
			layout: {
				margin: 0
			},

			scales: {
				x: {
					grid: { color: dimmedColor, lineWidth: 0.4 },
					ticks: { color: lightDimmedColor }
				},

				y: {
					grid: { color: dimmedColor, lineWidth: 0.4 },
					ticks: { color: lightDimmedColor }
				}
			}
		},

		plugins: []
	};

	return (
		<div className={styles.monthBlock}>
			<div className={styles.header}>
				<h3>Weekly Completion Stats</h3>
				<FaCalendarAlt style={{ color }} />
			</div>

			<Line {...config} />
		</div>
	)
}

export default MonthBlock;