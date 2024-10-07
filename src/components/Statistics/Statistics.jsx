import styles from '../../css/Statistics.module.css';

// react
import { useState } from 'react';

// components
import YearPicker from './YearPicker';
import Card from './Card';
import WeekdayChart from './WeekdayChart';
import MonthlyChart from './MonthlyChart';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getCurrentStreak from '../../utils/getCurrentStreak';
import getLongestStreak from '../../utils/getLongestStreak';

// icons
import { FaAward, FaCalendarWeek, FaCalendarAlt, FaHashtag } from "react-icons/fa";

function Statistics(props) {
	const {
		completedDays, frequency, color
	} = props;

	// --- Selected Year ---
	const currYear = new Date().getFullYear();
	const earliestYear = new Date(
		completedDays[completedDays.length - 1]?.date
	).getFullYear() || currYear;

	const [selectedYear, setSelectedYear] = useState(currYear);

	const handleIncreaseYear = () => setSelectedYear((c) => c === currYear ? c : c + 1);
	const handleDecreaseYear = () => setSelectedYear((c) => c === earliestYear ? c : c - 1);
	//

	const selectedDays = completedDays.filter(
		(day) => new Date(day.date).getFullYear() === selectedYear
	);

	// --- Streaks ---
	const currentStreak = getCurrentStreak(completedDays, frequency);
	const longestStreak = getLongestStreak(selectedDays, frequency);

	const percentageDifference = Math.floor(
		((currentStreak - longestStreak) / (longestStreak || 1)) * 100
	);
	//

	// --- Dimmed color ---
	const darkenedColor = getDimmedColor(color);
	//

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
					icon={<FaAward style={{ color: color }} />}
					contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
				>
					{longestStreak}
				</Card>
			</div>

			<Card
				title="Completions / Weekday"
				icon={<FaCalendarWeek style={{ color: color }} />}
			>
				<WeekdayChart
					{...{ color }}
					days={selectedDays}
					frequency={frequency}
					options={chartOptions}
				/>
			</Card>

			<Card
				title="Total Completed"
				icon={<FaHashtag style={{ color: color }} />}
				contentStyle={{ fontSize: '2.2rem', fontWeight: 'bold' }}
			>
				{selectedDays.length}
			</Card>

			<Card
				title="Completions / Month"
				icon={<FaCalendarAlt style={{ color: color }} />}
			>
				<MonthlyChart
					{...{ color }}
					days={selectedDays}
					frequency={frequency}
					options={chartOptions}
				/>
			</Card>
		</div>
	);
}

export default Statistics;