import styles from '../../css/Calendar.module.css';

// components
import Month from './Month';

// types
import { CompletedDay } from '../../types/habit';
import { ColorPalette } from '../../types/colorScheme';

// utils
import { countMonths } from '@shared/lib';

interface Props {
	completedDays: CompletedDay[];
	colorPalette: ColorPalette;
	frequency: number;
}

function Calendar(props: Props) {
	const {
		completedDays,
		colorPalette,
		frequency
	} = props;

	const startMonth = new Date(completedDays[completedDays.length - 1]?.date || new Date());
	// const endMonth = completedDays.length === 0 ? new Date() : new Date(completedDays[0]?.date);
	const endMonth = new Date();
	const monthsCount = countMonths(startMonth, endMonth);
	// const monthsCount = 1;

	const visibleMonthsCount = Math.max(monthsCount,
		monthsCount <= 4 ? monthsCount
			: monthsCount <= 8 ? 8 : 12
	);

	let months = [];

	// day style
	const dayGap = Math.max(2, 6 - ((monthsCount - 1) * 2)) + 'px';
	const dayBorderRadius = Math.max(3, 10 - (monthsCount * 2)) + 'px';
	const isDaySquare = monthsCount > 1;

	for (let index = 0; index < visibleMonthsCount; index++) {
		const date = new Date(startMonth.getFullYear(), startMonth.getMonth() + index, 1);

		months.push(
			<Month
				key={index}
				completedDays={completedDays}
				colorPalette={colorPalette}
				frequency={frequency}
				date={date}
				visibleMonthsCount={visibleMonthsCount}
				dayGap={dayGap}
				dayBorderRadius={dayBorderRadius}
				isDaySquare={isDaySquare}
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