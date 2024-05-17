import styles from '../../css/Month.module.css';

// utils
import getFormattedDate from '../../utils/getFormattedDate';

function Month(props) {
	const {
		date,
		color,
		dimmedColor,
		lightDimmedColor,
		completedDays,
		isDayNumVisible,
		isDaySquare,
		dayGap,
		dayBorderRadius
	} = props;

	const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	let shift = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	shift = shift ? shift - 1 : 6;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			let isCompleted = false;
			let isToday = false;

			if (index >= shift) {
				const day = new Date(date.getFullYear(), date.getMonth(), (index - shift + 1));
				isToday = day.toDateString() === new Date().toDateString();

				if (completedDays) {
					isCompleted = completedDays.includes(getFormattedDate(day));
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
					{isDayNumVisible && (
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
			{days}
		</div>
	);
}

export default Month;