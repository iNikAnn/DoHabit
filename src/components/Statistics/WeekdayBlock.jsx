import styles from '../../css/WeekdayBlock.module.css';

// utils
import getCompletionCountPerDay from '../../utils/getCompletionCountPerDay';

// icons
import { FaCalendarWeek } from "react-icons/fa";

function WeekdayBlock({ habit, color, dimmedColor, lightDimmedColor }) {
	const completionCountPerDay = getCompletionCountPerDay(habit.completedDays, habit.frequency);

	const values = Object.values(completionCountPerDay);
	let maxCount = Math.max(...values);

	const areAllValuesSame = values.every(
		(value) => value === values[0]
	);

	maxCount = areAllValuesSame ? maxCount * 2 : maxCount;

	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

	const bars = weekdays.map(
		(day, index) => {
			const height = ((completionCountPerDay[index] / maxCount) * 100) || 0;

			return (
				<div
					key={day}
					style={{ order: index ? 0 : 1 }}
					className={styles.col}
				>
					<div
						style={{ backgroundColor: dimmedColor }}
						className={styles.barWrapper}
					>
						<div
							style={{
								height: height + '%',
								backgroundColor: color,
								filter: `saturate(${height}%)`
							}}
							className={styles.bar}
						/>
					</div>
				</div>
			)
		}
	);

	const days = weekdays.map(
		(day, index) => (
			<small
				key={day}
				style={{
					color: lightDimmedColor,
					order: index ? 0 : 1
				}}
				className={styles.day}
			>
				{day}
			</small>
		)
	);

	return (
		<div className={styles.weekdayBlock}>
			<div className={styles.header}>
				<h3>Weekly Completion Stats</h3>
				<FaCalendarWeek style={{ color }} />
			</div>

			<div className={styles.weekdaysWrapper}>
				{bars}

				<div className={styles.grade}>
					<div
						style={{ backgroundColor: dimmedColor }}
						className={styles.gradeLine}
					>
						<small
							style={{ color: lightDimmedColor }}
						>
							{maxCount}
						</small>
					</div>

					{maxCount > 1 && (
						<div
							style={{ backgroundColor: dimmedColor }}
							className={styles.gradeLine}
						>
							<small
								style={{ color: lightDimmedColor }}
							>
								{Math.floor(maxCount / 2)}
							</small>
						</div>
					)}

					<div
						style={{ backgroundColor: dimmedColor }}
						className={styles.gradeLine}
					>
						<small
							style={{ color: lightDimmedColor }}
						>
							0
						</small>
					</div>
				</div>
			</div>

			<div className={styles.days}>
				{days}
			</div>
		</div>
	)
}

export default WeekdayBlock;