import styles from '../../css/Statistics.module.css';

// components
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

	// dimmed color
	const color = dbColors[habit.colorIndex];
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	const chartOptions = {
		scales: {
			x: {
				grid: { color: dimmedColor, lineWidth: 0.4 },
				ticks: { color: lightDimmedColor }
			},

			y: {
				grid: { color: dimmedColor, lineWidth: 0.4 },
				ticks: { color: lightDimmedColor }
			}
		}
	};

	return (
		<div className={styles.statistics}>
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
				title="Completion / Weekday"
				icon={<FaCalendarWeek style={{ color: color }} />}
			>
				<WeekdayChart
					{...{ habit, color }}
					options={chartOptions}
				/>
			</Chart>

			<Chart
				title="Completion / Month"
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