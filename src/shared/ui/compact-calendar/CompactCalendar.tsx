import styles from './CompactCalendar.module.css';
import clsx from 'clsx';
import { formatDate } from '@shared/lib';

interface Props {
	weeksCount?: number;
	color?: string;
	accentColor?: string;
	highlightToday?: boolean;
	getCompletedDates: (days: Date[]) => Set<string>;
}

/**
 * Renders weeks as columns starting from Monday.
 */
function CompactCalendar(props: Props) {
	const {
		weeksCount = 24,
		color,
		accentColor,
		highlightToday,
		getCompletedDates
	} = props;

	const now = new Date();
	const currentDayIndex = now.getDay();

	// Total days: full previous weeks + days in current week
	const totalDays = 7 * (weeksCount - 1) + (currentDayIndex || 7);

	// Array of dates starting from Monday of the first week up to today, inclusive.
	const allDays = Array.from({ length: totalDays }, (_, i) => {
		const date = new Date(now);
		date.setDate(now.getDate() - (totalDays - 1 - i));
		date.setHours(0, 0, 0, 0);
		return date;
	});

	// Group into weeks (columns)
	const weeks: Date[][] = [];
	for (let i = 0; i < allDays.length; i += 7) {
		weeks.push(allDays.slice(i, i + 7));
	}

	const completedDates = getCompletedDates(allDays);

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
			className={styles.calendar}
		>
			{weeks.map((week, weekIndex) => (
				<div key={weekIndex} className={styles.week}>
					{week.map((date) => {
						const isToday = date.toDateString() === now.toDateString();
						const isCompleted = completedDates.has(formatDate(date));

						return (
							<div
								key={date.toISOString()}
								style={{
									backgroundColor: isCompleted ? accentColor : color
								}}
								className={clsx(
									styles.day,
									(isToday && highlightToday) && styles.today
								)}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}

export { CompactCalendar };