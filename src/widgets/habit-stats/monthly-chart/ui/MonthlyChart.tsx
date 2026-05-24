import type { ChartOptions, ChartData } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { FaCalendarAlt } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { type CompletedDay, getCompletionCountPerMonth } from '@entities/habit';
import { MONTHS } from '@shared/const';
import { Card } from '@shared/ui';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
	options: ChartOptions<'line'>;
	days: CompletedDay[];
	color: string;
}

function MonthlyChart({ options, days, color }: Props) {
	const data = getCompletionCountPerMonth(days);

	// Canvas API doesn't support CSS color functions, so resolve them manually here.
	const tempDiv = document.createElement('div');
	tempDiv.style.color = color;
	document.body.append(tempDiv);
	const computedColor = getComputedStyle(tempDiv).color;

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

				borderColor: computedColor,
				// borderWidth: 1,
				tension: .4,

				backgroundColor: (context) => {
					if (!context.chart.chartArea) return;

					const { ctx, chartArea: { top, bottom } } = context.chart;
					const bg = ctx.createLinearGradient(0, top, 0, bottom);

					bg.addColorStop(0, computedColor);
					bg.addColorStop(1, 'transparent');

					return bg;
				},

				fill: true,
			}]
		},
		options
	};

	return (
		<Card
			title='Completions / Month'
			extra={<FaCalendarAlt style={{ color }} />}
		>
			<Line {...config} />
		</Card>
	);
}

export { MonthlyChart };