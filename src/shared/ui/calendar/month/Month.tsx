import { WEEKDAYS } from '@shared/const';
import styles from './Month.module.css';
import { formatDate } from '@shared/lib/date-time';
import type { ColorVariants } from '@shared/lib/theme';

interface Props {
	today: Date;
	monthDate: Date;
	completedSet: Set<string>;
	colorVariants: ColorVariants;
	highlightToday?: boolean;
	showDayNames?: boolean;
	showDayNumbers?: boolean;
}

/**
 * Displays a single month grid with daily status.
 */
function Month(props: Props) {
	const {
		today,
		monthDate,
		completedSet,
		colorVariants: {
			baseColor,
			darkenedColor,
			softenedColor
		},
		highlightToday,
		showDayNames,
		showDayNumbers
	} = props;

	const year = monthDate.getFullYear();
	const month = monthDate.getMonth();

	// Get total days and empty cells before first day
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const shift = (new Date(year, month, 1).getDay() || 7) - 1;

	const monthStr = String(month + 1).padStart(2, '0');

	const days = Array.from({ length: shift + daysInMonth }, (_, i) => {
		// Render empty slots for correct weekday alignment
		if (i < shift) return <div key={`empty-${i}`} className={styles.day} />;

		const dayNum = i - shift + 1;
		const dayStr = `${year}-${monthStr}-${String(dayNum).padStart(2, '0')}`;

		const isToday = dayStr === formatDate(today);
		const isCompleted = completedSet.has(dayStr);

		return (
			<div
				key={dayNum}
				style={{
					color: isCompleted ? 'inherit' : softenedColor,
					backgroundColor: isCompleted ? baseColor : darkenedColor,
					outline: (isToday && highlightToday) ? '2px solid var(--color-primary)' : '',
					outlineOffset: '-2px'
				}}
				className={styles.day}
			>
				{showDayNumbers && dayNum}
			</div>
		);
	});

	const weekdays = showDayNames
		? [...WEEKDAYS.slice(1), 'Sunday'].map((weekday, index) => {
			const isToday = ((index + 1) % 7) === today.getDay();
			const isCurrentMonth = today.getMonth() === monthDate.getMonth();

			return (
				<div
					key={weekday}
					style={{ color: (isToday && isCurrentMonth) ? 'inherit' : softenedColor }}
					className={styles.weekday}
				>
					{weekday.slice(0, 2)}
				</div>
			);
		})
		: null;

	return (
		<div className={styles.month}>
			{showDayNames && (
				<div className={styles.weekdaysGrid}>
					{weekdays}
				</div>
			)}

			<div className={styles.daysGrid}>
				{days}
			</div>
		</div>
	);
}

export default Month;