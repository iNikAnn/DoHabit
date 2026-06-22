import styles from './Calendar.module.css';
import { useMemo } from 'react';
import Month from '../month/Month';
import { countDaysBetween, getDatesRange } from '@shared/lib/date-time';

interface CalendarProps {
	highlightToday?: boolean;
	showDayNames?: boolean;
	showDayNumbers?: boolean;
	getCompletedDates: (days: string[]) => Set<string>;
}

const VISIBLE_MONTHS_COUNT = 2;

/**
 * Main calendar component.
 */
function Calendar(props: CalendarProps) {
	const {
		highlightToday,
		showDayNames,
		showDayNumbers,
		getCompletedDates,
	} = props;

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	// Set range boundaries
	const firstDay = useMemo(
		() => new Date(currentYear, currentMonth - VISIBLE_MONTHS_COUNT + 1, 1),
		[currentMonth, currentYear]
	);

	const lastDay = new Date(currentYear, currentMonth + 1, 0);

	// Get total days including start and end dates
	const daysCount = countDaysBetween(firstDay, lastDay) + 2;

	// Create date strings and get status set
	const datesRange = useMemo(
		() => getDatesRange(daysCount, { from: firstDay }),
		[daysCount, firstDay]
	);

	const completedSet = getCompletedDates(datesRange);

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${VISIBLE_MONTHS_COUNT}, 1fr)` }}
			className={styles.calendar}
		>
			{Array.from({ length: VISIBLE_MONTHS_COUNT }).map((_, i) => {
				const monthDate = new Date(currentYear, currentMonth - i, 1);

				return (
					<Month
						key={monthDate.toISOString()}
						today={now}
						monthDate={monthDate}
						completedSet={completedSet}
						highlightToday={highlightToday}
						showDayNames={showDayNames}
						showDayNumbers={showDayNumbers}
					/>
				);
			}).reverse()} {/* Sort months from oldest to newest */}
		</div>
	);
}

export { Calendar };