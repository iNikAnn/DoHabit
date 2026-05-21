import styles from './HabitStatisticsPage.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChartOptions } from 'chart.js';
import { MonthlyChart } from '@widgets/habit-stats/monthly-chart';
import { StreakHistory } from '@widgets/habit-stats/streak-history';
import { StreakOverview } from '@widgets/habit-stats/streak-overview';
import { TotalCompletedMetric } from '@widgets/habit-stats/total-completed-metric';
import { WeekdayChart } from '@widgets/habit-stats/weekday-chart';
import { CompletedDay, getStreaks } from '@entities/habit';
import { ColorVariants } from '@shared/lib/theme';
import { YearPicker } from '@shared/ui';

interface LocationState {
	completedDays: CompletedDay[];
	colorVariants: ColorVariants;
}

function HabitStatisticsPage() {
	const location = useLocation();
	const state = location.state as LocationState;

	const {
		completedDays = [],
		colorVariants
	} = state ?? {};

	const { baseColor, darkenedColor } = colorVariants;

	// --- Selected Year:START ---
	const currYear = new Date().getFullYear();
	const earliestYear = new Date(
		completedDays.at(-1)?.date ?? String(currYear)
	).getFullYear();

	const [selectedYear, setSelectedYear] = useState(currYear);
	// --- Selected Year:END ---

	const selectedDays = completedDays.filter(
		(day) => new Date(day.date).getFullYear() === selectedYear
	);

	// --- Streaks:START ---
	const { currentStreak } = getStreaks(completedDays);
	const { allStreaks, longestStreak } = getStreaks(selectedDays);
	const filteredStreaks = allStreaks.filter((s) => s.length > 1);
	// --- Streaks:END ---

	const chartOptions: ChartOptions<'bar' | 'line'> = {
		scales: {
			x: {
				grid: { color: darkenedColor, lineWidth: 0.4 },
				ticks: { color: 'gray' }
			},

			y: {
				grid: { color: darkenedColor, lineWidth: 0.4 },
				ticks: { color: 'gray' }
			}
		}
	};

	return (
		<div className={styles.statistics}>
			<YearPicker
				value={selectedYear}
				min={earliestYear}
				max={currYear}
				onChange={setSelectedYear}
			/>

			<StreakOverview
				currentStreak={currentStreak}
				longestStreak={longestStreak}
				color={baseColor}
			/>

			<WeekdayChart
				days={selectedDays}
				options={chartOptions}
				color={baseColor}
			/>

			<TotalCompletedMetric
				days={selectedDays}
				color={baseColor}
			/>

			<MonthlyChart
				days={selectedDays}
				options={chartOptions}
				color={baseColor}
			/>

			<StreakHistory
				streaks={filteredStreaks}
				colorVariants={colorVariants}
			/>
		</div>
	);
}

export { HabitStatisticsPage };