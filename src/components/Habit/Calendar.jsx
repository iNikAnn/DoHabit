import styles from '../../css/Calendar.module.css';

// components
import Month from './Month';

// utils
import getStartMonth from '../../utils/getStartMonth';
import getMonthsDifference from '../../utils/getMonthsDifference';

function Calendar(props) {
	const {
		color,
		dimmedColor,
		lightDimmedColor,
		completedDays
	} = props;

	const startMonth = completedDays.length === 0 ? new Date() : getStartMonth(completedDays);
	const endMonth = completedDays.length === 0 ? new Date() : new Date(completedDays[0]);

	const monthsCount = getMonthsDifference(startMonth, endMonth);
	const months = [];

	for (let index = 0; index < monthsCount; index++) {
		const date = new Date(startMonth.getFullYear(), startMonth.getMonth() + index, 1);

		months.push(
			<Month date={date} {...props} />
		);
	};

	return (
		<div className={styles.calendar}>
			{months}
		</div>
	);
}

export default Calendar;