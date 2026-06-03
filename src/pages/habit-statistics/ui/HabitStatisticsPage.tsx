import styles from './HabitStatisticsPage.module.css';
import { useState } from 'react';
import { type ChartOptions } from 'chart.js';
import { MonthlyChart } from '@widgets/habit-stats/monthly-chart';
import { StreakHistory } from '@widgets/habit-stats/streak-history';
import { StreakOverview } from '@widgets/habit-stats/streak-overview';
import { TotalCompletedMetric } from '@widgets/habit-stats/total-completed-metric';
import { WeekdayChart } from '@widgets/habit-stats/weekday-chart';
import { getStreaks, useHabitsStore } from '@entities/habit';
import { getAppPalette } from '@shared/lib/theme';
import { YearPicker } from '@shared/ui';
import { useInitialRouteState } from '@shared/lib/router';

function HabitStatisticsPage() {
	const { habitId } = useInitialRouteState<'STATISTICS'>();
	const habits = useHabitsStore((s) => s.habits);
	const habit = habits.find((h) => h.id === habitId);

	const colorVariants = getAppPalette()[habit ? habit.colorIndex : 0];
	const { baseColor, darkenedColor } = colorVariants;

	const completedDays = habit ? habit.completedDays : [];

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
				options={chartOptions as ChartOptions<'bar'>}
				color={baseColor}
			/>

			<TotalCompletedMetric
				days={selectedDays}
				color={baseColor}
			/>

			<MonthlyChart
				days={selectedDays}
				options={chartOptions as ChartOptions<'line'>}
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