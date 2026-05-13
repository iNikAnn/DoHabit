import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, ChartOptions, ChartData, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CompletedDay, getCompletionCountPerMonth } from '@entities/habit';
import { MONTHS } from '@shared/const';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
	options: ChartOptions<'line'>;
	days: CompletedDay[];
	color: string;
}

function MonthlyChart({ options, days, color }: Props) {
	const data = getCompletionCountPerMonth(days);

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