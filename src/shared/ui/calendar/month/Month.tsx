import styles from './Month.module.css';
import { startCase } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import { formatDate, getWeekdayLabels } from '@shared/lib/date-time';

interface Props {
	today: Date;
	monthDate: Date;
	completedSet: Set<string>;
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
		highlightToday,
		showDayNames,
		showDayNumbers
	} = props;

	// UI localization
	const { i18n } = useTranslation();

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
					color: isCompleted
						? 'inherit'
						: 'var(--habit-color-soft)',
					backgroundColor: isCompleted
						? 'var(--habit-color-base)'
						: 'var(--habit-color-dark)',
					outline: (isToday && highlightToday) ? '2px solid var(--color-primary)' : '',
					outlineOffset: '-2px',
				}}
				className={styles.day}
			>
				{showDayNumbers && dayNum}
			</div>
		);
	});

	const lang = i18n.language;
	const weekdayLables = getWeekdayLabels(lang, { length: lang === 'zh' ? 'narrow' : 'short' });

	const weekdays = showDayNames
		? weekdayLables.map((weekday, index) => {
			const isToday = ((index + 1) % 7) === today.getDay();
			const isCurrentMonth = today.getMonth() === monthDate.getMonth();

			return (
				<div
					key={weekday}
					style={{
						color: (isToday && isCurrentMonth)
							? 'inherit'
							: 'var(--habit-color-soft)',
					}}
					className={styles.weekday}
				>
					{startCase(weekday.slice(0, 2))}
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