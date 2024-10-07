import styles from '../../css/Month.module.css';

// utils
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function Month(props) {
	const {
		date,

		colorPalette,
		completedDays, frequency,

		visibleMonthsCount, isDaySquare, dayGap, dayBorderRadius
	} = props;

	const { baseColor, darkenedColor, softenedColor } = colorPalette;

	const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const today = new Date();

	const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		.map((weekday, index) => {
			const isToday = ((index + 1) % 7) === today.getDay();

			return (
				<span
					key={weekday}
					style={{ color: isToday ? 'inherit' : softenedColor }}
					className={styles.weekday}
				>
					{weekday}
				</span>
			)
		});

	let shift = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7) - 1;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			let isCompleted = false;
			let isToday = false;

			if (index >= shift) {
				const thisDay = new Date(date.getFullYear(), date.getMonth(), (index - shift + 1));
				isToday = thisDay.toDateString() === today.toDateString();

				if (completedDays) {
					isCompleted = checkHabitCompletion(completedDays, thisDay, frequency);
				};
			};

			// day style
			const dayStyle = {
				backgroundColor: isCompleted ? baseColor : (index >= shift) ? darkenedColor : '',
				color: isCompleted || isToday ? 'inherit' : softenedColor,
				border: isToday ? `2px solid #e6e6e6` : '',
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