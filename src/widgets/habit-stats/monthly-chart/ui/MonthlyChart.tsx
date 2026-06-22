import type { ChartOptions, ChartData } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { type CompletedDay, getCompletionCountPerMonth } from '@entities/habit';
import { getMonthLabels } from '@shared/lib/date-time';
import { Card } from '@shared/ui';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
	options: ChartOptions<'line'>;
	days: CompletedDay[];
	color: string;
}

function MonthlyChart({ options, days, color }: Props) {
	// UI localization
	const { t, i18n } = useTranslation();

	const data = getCompletionCountPerMonth(days);

	const config: {
		data: ChartData<'line'>,
		options: ChartOptions<'line'>,
	} = {
		data: {
			labels: getMonthLabels(i18n.language, { length: 'short' }),
			datasets: [{
				label: t('habits.stats.chartCompletions'),
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
		<Card
			title={t('habits.stats.monthlyChartTitle')}
			extra={<FaCalendarAlt style={{ color }} />}
		>
			<Line {...config} />
		</Card>
	);
}

export { MonthlyChart };