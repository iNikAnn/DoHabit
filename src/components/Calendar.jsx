import styles from '../css/Calendar.module.css';

// utils
import getFormattedDate from '../utils/getFormattedDate';

function Calendar(props) {
	const {
		completedDays
	} = props;

	const now = new Date();
	const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

	let shift = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
	shift = shift ? shift - 1 : 6;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			let completed = false;

			if (index >= shift) {
				const day = new Date(now.getFullYear(), now.getMonth(), (index - shift + 1));
				const isCompleted = completedDays.includes(getFormattedDate(day));

				if (isCompleted) {
					completed = true;
				};
			};

			return (
				<span className={`${index < shift ? '' : styles.day} ${completed ? styles.completed : ''}`} />
			);
		});

	return (
		<div className={styles.calendar}>
			{days}
		</div>
	);
}

export default Calendar;