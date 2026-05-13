import styles from './CompactCalendar.module.css';
import clsx from 'clsx';
import { formatDate, getDatesRange } from '@shared/lib';

interface Props {
	weeksCount?: number;
	color?: string;
	accentColor?: string;
	highlightToday?: boolean;
	getCompletedDates: (days: string[]) => Set<string>;
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

	const dateRange = getDatesRange(totalDays, { to: now });

	// Group into weeks (columns)
	const weeks: string[][] = [];
	for (let i = 0; i < dateRange.length; i += 7) {
		weeks.push(dateRange.slice(i, i + 7));
	}

	const completedSet = getCompletedDates(dateRange);

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
			className={styles.calendar}
		>
			{weeks.map((week, weekIndex) => (
				<div key={weekIndex} className={styles.week}>
					{week.map((date) => {
						const isToday = date === formatDate(now);
						const isCompleted = completedSet.has(date);

						return (
							<div
								key={date}
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