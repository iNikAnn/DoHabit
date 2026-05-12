import { BarElement, Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CompletedDay, getCompletionCountPerDay } from '@entities/habit';
import { WEEKDAYS } from '@shared/const';

ChartJS.register(BarElement);

interface Props {
	options: ChartOptions<'bar'>;
	days: CompletedDay[];
	color: string;
}

function WeekdayChart({ options, days, color }: Props) {
	const data = getCompletionCountPerDay(days);

	const config: {
		data: ChartData<'bar'>,
		options: ChartOptions<'bar'>
	} = {
		data: {
			labels: [...WEEKDAYS.slice(1), 'Sun'],
			datasets: [{
				label: 'WeekdayChart',
				data: [...data.slice(1), data[0]!],

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