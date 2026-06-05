import type { ChartData, ChartOptions } from 'chart.js';
import { BarElement, Chart as ChartJS } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaCalendarWeek } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { type CompletedDay, getCompletionCountPerDay } from '@entities/habit';
import { WEEKDAYS } from '@shared/const';
import { Card } from '@shared/ui';

ChartJS.register(BarElement);

interface Props {
	options: ChartOptions<'bar'>;
	days: CompletedDay[];
	color: string;
}

/**
 * Renders a bar chart showing habit completion frequency for each day of the week.
 */
function WeekdayChart({ options, days, color }: Props) {
	const { t } = useTranslation();
	const data = getCompletionCountPerDay(days);

	// Canvas API doesn't support CSS color functions, so resolve them manually here.
	const tempDiv = document.createElement('div');
	tempDiv.style.color = color;
	document.body.append(tempDiv);
	const computedColor = getComputedStyle(tempDiv).color;

	const config: {
		data: ChartData<'bar'>,
		options: ChartOptions<'bar'>
	} = {
		data: {
			labels: [...WEEKDAYS.slice(1), 'Sun'], // eslint-disable-line
			datasets: [{
				label: t('habits.chartCompletionsLabel'),
				data: [...data.slice(1), data[0]!],

				backgroundColor: computedColor,
				borderRadius: 10,
				borderSkipped: false
			}]
		},
		options
	};

	return (
		<Card
			title={t('habits.weekdayChartTitle')}
			extra={<FaCalendarWeek style={{ color }} />}
		>
			<Bar {...config} />
		</Card>
	);
}

export { WeekdayChart };