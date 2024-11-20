import styles from '../../css/Statistics.module.css';

// react
import { useState } from 'react';

// router
import { useLocation } from 'react-router-dom';

// components
import YearPicker from './YearPicker';
import Card from './Card';
import WeekdayChart from './WeekdayChart';
import MonthlyChart from './MonthlyChart';
import StreakHistory from './StreakHistory';

// utils
import getStreaks from '../../utils/getStreaks';

// icons
import { FaAward, FaCalendarWeek, FaCalendarAlt, FaHashtag, FaBinoculars } from "react-icons/fa";

function Statistics() {

	const location = useLocation();

	const {
		completedDays, frequency, colorPalette
	} = location.state;

	const { baseColor, darkenedColor } = colorPalette;

	// --- Selected Year:START ---
	const currYear = new Date().getFullYear();
	const earliestYear = new Date(
		completedDays[completedDays.length - 1]?.date
	).getFullYear() || currYear;

	const [selectedYear, setSelectedYear] = useState(currYear);

	const handleIncreaseYear = () => setSelectedYear((c) => c === currYear ? c : c + 1);
	const handleDecreaseYear = () => setSelectedYear((c) => c === earliestYear ? c : c - 1);
	// --- Selected Year:END ---

	const selectedDays = completedDays.filter(
		(day) => new Date(day.date).getFullYear() === selectedYear
	);

	// --- Streaks:START ---
	const { currentStreak } = getStreaks(completedDays, frequency);
	const { allStreaks, longestStreak } = getStreaks(selectedDays, frequency);
	const filteredStreaks = allStreaks.filter((s) => s.length > 1);
	// --- Streaks:END ---

	const percentageDifference = Math.floor(
		((currentStreak - longestStreak) / (longestStreak || 1)) * 100
	);

	const chartOptions = {
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
				{...{ earliestYear, currYear, selectedYear }}
				increase={handleIncreaseYear}
				decrease={handleDecreaseYear}
			/>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<Card
					title="Current"
					icon={percentageDifference + '%'}
					accentColor={percentageDifference < 0 ? 'IndianRed' : '#57a639'}
					contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
				>
					{currentStreak}
				</Card>

				<Card
					title="Longest"
					icon={<FaAward style={{ color: baseColor }} />}
					contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
				>
					{longestStreak}
				</Card>
			</div>

			<Card
				title="Completions / Weekday"
				icon={<FaCalendarWeek style={{ color: baseColor }} />}
			>
				<WeekdayChart
					{...{ color: baseColor }}
					days={selectedDays}
					frequency={frequency}
					options={chartOptions}
				/>
			</Card>

			<Card
				title="Total Completed"
				icon={<FaHashtag style={{ color: baseColor }} />}
				contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
			>
				{selectedDays.length}
			</Card>

			<Card
				title="Completions / Month"
				icon={<FaCalendarAlt style={{ color: baseColor }} />}
			>
				<MonthlyChart
					{...{ color: baseColor }}
					days={selectedDays}
					frequency={frequency}
					options={chartOptions}
				/>
			</Card>

			{filteredStreaks.length > 0 && (
				<Card
					title="Streak History"
					desc="Shows streaks of 2 days or more."
					icon={<FaBinoculars style={{ color: baseColor }} />}
				>
					<StreakHistory
						{...{ colorPalette, streaks: filteredStreaks }}
					/>
				</Card>
			)}
		</div>
	);
}

export default Statistics;