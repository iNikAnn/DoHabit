// constants
import { MONTHS } from '@shared/const';

// types
import { CompletedDay } from '../../types/habit';

// utils
import getCompletionCountPerMonth from '../../utils/getCompletionCountPerMonth';

// chart js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, ChartOptions, ChartData, } from 'chart.js';

// icons
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
	options: ChartOptions<'line'>;
	days: CompletedDay[];
	frequency: number;
	color: string;
}

function MonthlyChart({ options, days, frequency, color }: Props) {

	const data = getCompletionCountPerMonth(days, frequency);

	const config: {
		data: ChartData<'line'>,
		options: ChartOptions<'line'>,
	} = {
		data: {
			labels: [...MONTHS],
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