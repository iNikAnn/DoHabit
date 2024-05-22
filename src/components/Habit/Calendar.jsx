import styles from '../../css/Calendar.module.css';

// components
import Month from './Month';

// utils
import getStartMonth from '../../utils/getStartMonth';
import getMonthsDifference from '../../utils/getMonthsDifference';

function Calendar(props) {
	const {
		completedDays,
	} = props;

	const startMonth = getStartMonth(completedDays);
	const endMonth = completedDays.length === 0 ? new Date() : new Date(completedDays[0]?.date);
	const monthsCount = getMonthsDifference(startMonth, endMonth);
	// const monthsCount = 1;

	const visibleMonthsCount = Math.max(monthsCount,
		monthsCount <= 4 ? monthsCount
			: monthsCount <= 8 ? 8 : 12
	);

	let months = [];

	// day style
	const dayGap = Math.max(1, 6 - ((monthsCount - 1) * 2)) + 'px';
	const dayBorderRadius = Math.max(2, 10 - (monthsCount * 2)) + 'px';
	const isDaySquare = monthsCount > 1;

	for (let index = 0; index < visibleMonthsCount; index++) {
		const date = new Date(startMonth.getFullYear(), startMonth.getMonth() + index, 1);

		months.push(
			<Month
				key={index}
				{...props}
				{...{
					date, visibleMonthsCount,
					isDaySquare, dayGap, dayBorderRadius
				}}
			/>
		);
	};

	const calendarStyle = {
		gridTemplateColumns: `repeat(${monthsCount > 3 ? 4 : monthsCount}, 1fr)`,
	};

	return (
		<div
			style={calendarStyle}
			className={styles.calendar}
		>
			{months.length <= 12 ? months : months.slice(-12)}
		</div>
	);
}

export default Calendar;