import styles from '../../css/Calendar.module.css';

// components
import Month from './Month';

function Calendar(props) {
	const {
		color,
		dimmedColor,
		lightDimmedColor,
		completedDays
	} = props;

	return (
		<div className={styles.calendar}>
			{/* {days} */}
			<Month {...props} />
		</div>
	);
}

export default Calendar;