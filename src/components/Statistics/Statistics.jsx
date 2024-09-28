import styles from '../../css/Statistics.module.css';

// react
import { useState } from 'react';

// components
import YearPicker from './YearPicker';
import Chart from './Chart';
import StreakBlock from './StreakBlock';
import StreakChart from './StreakChart';
import WeekdayChart from './WeekdayChart';
import MonthlyChart from './MonthlyChart';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getLightDimmedColor from '../../utils/getLightDimmedColor';

// icons
import { FaChartBar } from "react-icons/fa6";
import { FaCalendarWeek } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

// db
import dbColors from '../../db/dbColors';

function Statistics(props) {
	const {
		habits, habitTitle,
	} = props;

	const habit = habits.find((h) => h.title === habitTitle);

	// selected year
	const currYear = new Date().getFullYear();
	const earliestYear = new Date(
		habit.completedDays[habit.completedDays.length - 1].date
	).getFullYear();

	const [selectedYear, setSelectedYear] = useState(currYear);

	const handleIncreaseYear = () => setSelectedYear((c) => c === currYear ? c : c + 1);
	const handleDecreaseYear = () => setSelectedYear((c) => c === earliestYear ? c : c - 1);

	// dimmed color
	const color = dbColors[habit.colorIndex];
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	const chartOptions = {
		scales: {
			x: {
				grid: { color: dimmedColor, lineWidth: 0.4 },
				ticks: { color: 'gray' }
			},

			y: {
				grid: { color: dimmedColor, lineWidth: 0.4 },
				ticks: { color: 'gray' }
			}
		}
	};

	return (
		<div className={styles.statistics}>
			<YearPicker
				year={selectedYear}
				increase={handleIncreaseYear}
				decrease={handleDecreaseYear}
			/>
			{/* <StreakBlock {...{ habit }} /> */}

			<Chart
				title="Streaks"
				icon={<FaChartBar style={{ color: color }} />}
			>
				<StreakChart
					{...{ habit, color }}
					options={chartOptions}
				/>
			</Chart>

			<Chart
				title="Completions / Weekday"
				icon={<FaCalendarWeek style={{ color: color }} />}
			>
				<WeekdayChart
					{...{ habit, color }}
					options={chartOptions}
				/>
			</Chart>

			<Chart
				title="Completions / Month"
				icon={<FaCalendarAlt style={{ color: color }} />}
			>
				<MonthlyChart
					{...{ habit, color }}
					options={chartOptions}
				/>
			</Chart>
		</div>
	);
}

export default Statistics;