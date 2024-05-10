import styles from '../css/Calendar.module.css';

// utils
import getFormattedDate from '../utils/getFormattedDate';

function Calendar(props) {
	const {
		color,
		completedDays
	} = props;

	const now = new Date();
	const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

	let shift = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
	shift = shift ? shift - 1 : 6;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			let isCompleted = false;

			if (index >= shift) {
				const day = new Date(now.getFullYear(), now.getMonth(), (index - shift + 1));

				if (completedDays) {
					isCompleted = completedDays.includes(getFormattedDate(day));
				};
			};

			return (
				<span
					style={{ backgroundColor: isCompleted ? color : '' }}
					className={`${index < shift ? '' : styles.day}`}
				/>
			);
		});

	return (
		<div className={styles.calendar}>
			{days}
		</div>
	);
}

export default Calendar;