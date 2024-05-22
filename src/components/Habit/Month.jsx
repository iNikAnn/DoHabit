import styles from '../../css/Month.module.css';

// utils
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function Month(props) {
	const {
		date,

		color, dimmedColor, lightDimmedColor,
		completedDays, frequency,

		visibleMonthsCount, isDaySquare, dayGap, dayBorderRadius
	} = props;

	const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		.map((weekday) => (
			<span
				key={weekday}
				style={{ color: lightDimmedColor }}
				className={styles.weekday}
			>
				{weekday}
			</span>
		));

	let shift = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7) - 1;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			let isCompleted = false;
			let isToday = false;

			if (index >= shift) {
				const thisDay = new Date(date.getFullYear(), date.getMonth(), (index - shift + 1));
				isToday = thisDay.toDateString() === new Date().toDateString();

				if (completedDays) {
					isCompleted = checkHabitCompletion(completedDays, thisDay, frequency);
				};
			};

			// day style
			const dayStyle = {
				backgroundColor: isCompleted ? color : (index >= shift) ? dimmedColor : '',
				color: isCompleted ? 'inherit' : lightDimmedColor,
				border: isToday ? `2px solid ${color}` : '',
				borderRadius: dayBorderRadius,
				aspectRatio: isDaySquare ? '1 / 1' : '',
			};

			const dayNum = index < shift ? '' : index - shift + 1;

			return (
				<span
					key={index}
					style={dayStyle}
					className={`${index < shift ? '' : styles.day}`}
				>
					{visibleMonthsCount === 1 && (
						dayNum
					)}
				</span>
			);
		});

	const monthStyle = {
		gap: dayGap,
		gridAutoRows: isDaySquare ? '' : '2rem'
	};

	return (
		<div
			style={monthStyle}
			className={styles.month}
		>
			{visibleMonthsCount === 1 && (
				weekdays
			)}

			{days}
		</div>
	);
}

export default Month;