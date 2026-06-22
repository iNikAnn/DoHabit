import type { ChartData, ChartOptions } from 'chart.js';
import { BarElement, Chart as ChartJS } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaCalendarWeek } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { type CompletedDay, getCompletionCountPerDay } from '@entities/habit';
import { getWeekdayLabels } from '@shared/lib/date-time';
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
	const { t, i18n } = useTranslation();
	const data = getCompletionCountPerDay(days);

	const config: {
		data: ChartData<'bar'>,
		options: ChartOptions<'bar'>
	} = {
		data: {
			labels: getWeekdayLabels(i18n.language, { length: 'short' }),
			datasets: [{
				label: t('habits.stats.chartCompletions'),
				data: [...data.slice(1), data[0]!],
				backgroundColor: color,
				borderRadius: 10,
				borderSkipped: false
			}]
		},
		options
	};

	return (
		<Card
			title={t('habits.stats.weekdayChartTitle')}
			extra={<FaCalendarWeek style={{ color }} />}
		>
			<Bar {...config} />
		</Card>
	);
}

export { WeekdayChart };