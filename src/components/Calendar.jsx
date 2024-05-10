import styles from '../css/Calendar.module.css';

function Calendar() {
	const now = new Date();
	const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

	let shift = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
	shift = shift ? shift - 1 : 6;

	const days = new Array(shift + lastDayOfMonth)
		.fill(null)
		.map((_, index) => {
			return (
				<span className={index < shift ? '' : styles.day} />
			);
		});

	return (
		<div className={styles.calendar}>
			{days}
		</div>
	);
}

export default Calendar;