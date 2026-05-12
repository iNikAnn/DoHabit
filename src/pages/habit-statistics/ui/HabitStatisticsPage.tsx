import styles from './HabitStatisticsPage.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import YearPicker from '../../../components/Statistics/YearPicker';
import Card from '../../../components/Statistics/Card';
import WeekdayChart from '../../../components/Statistics/WeekdayChart';
import MonthlyChart from '../../../components/Statistics/MonthlyChart';
import StreakHistory from '../../../components/Statistics/StreakHistory';
import { ColorVariants } from '../../../types/colorScheme';
import { FaAward, FaCalendarWeek, FaCalendarAlt, FaHashtag, FaBinoculars } from 'react-icons/fa';
import { ChartOptions } from 'chart.js';
import { CompletedDay, getStreaks } from '@entities/habit';

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

	const handleIncreaseYear = () => setSelectedYear((c) => c === currYear ? c : c + 1);
	const handleDecreaseYear = () => setSelectedYear((c) => c === earliestYear ? c : c - 1);
	// --- Selected Year:END ---

	const selectedDays = completedDays.filter(
		(day) => new Date(day.date).getFullYear() === selectedYear
	);

	// --- Streaks:START ---
	const { currentStreak } = getStreaks(completedDays);
	const { allStreaks, longestStreak } = getStreaks(selectedDays);
	const filteredStreaks = allStreaks.filter((s) => s.length > 1);
	// --- Streaks:END ---

	const percentageDifference = Math.floor(
		((currentStreak - longestStreak) / (longestStreak || 1)) * 100
	);

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
				earliestYear={earliestYear}
				currYear={currYear}
				selectedYear={selectedYear}
				onIncrease={handleIncreaseYear}
				onDecrease={handleDecreaseYear}
			/>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<Card
					title='Current'
					icon={percentageDifference + '%'}
					accentColor={percentageDifference < 0 ? 'IndianRed' : '#57a639'}
					contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
				>
					{currentStreak}
				</Card>

				<Card
					title='Longest'
					icon={<FaAward style={{ color: baseColor }} />}
					contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
				>
					{longestStreak}
				</Card>
			</div>

			<Card
				title='Completions / Weekday'
				icon={<FaCalendarWeek style={{ color: baseColor }} />}
			>
				<WeekdayChart
					days={selectedDays}
					options={chartOptions}
					color={baseColor}
				/>
			</Card>

			<Card
				title='Total Completed'
				icon={<FaHashtag style={{ color: baseColor }} />}
				contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
			>
				{selectedDays.length}
			</Card>

			<Card
				title='Completions / Month'
				icon={<FaCalendarAlt style={{ color: baseColor }} />}
			>
				<MonthlyChart
					days={selectedDays}
					options={chartOptions}
					color={baseColor}
				/>
			</Card>

			{filteredStreaks.length > 0 && (
				<Card
					title='Streak History'
					desc='Shows streaks of 2 days or more.'
					icon={<FaBinoculars style={{ color: baseColor }} />}
				>
					<StreakHistory
						streaks={filteredStreaks}
						colorVariants={colorVariants}
					/>
				</Card>
			)}
		</div>
	);
}

export { HabitStatisticsPage };