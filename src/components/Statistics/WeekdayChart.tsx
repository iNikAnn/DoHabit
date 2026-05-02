// constants
import { WEEKDAYS } from '@shared/config';

// types
import { CompletedDay } from '../../types/habit';

// utils
import getCompletionCountPerDay from '../../utils/getCompletionCountPerDay';

// chart js
import { BarElement, Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement);

interface Props {
	options: ChartOptions<'bar'>;
	days: CompletedDay[];
	frequency: number;
	color: string;
}

function WeekdayChart({ options, days, frequency, color }: Props) {
	const data = getCompletionCountPerDay(days, frequency);

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