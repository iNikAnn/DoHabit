import styles from './Calendar.module.css';
import { ColorVariants } from '../../../../types/colorScheme';
import Month from '../month/Month';
import { countDaysBetween, getDatesRange } from '@shared/lib';

interface Props {
	colorVariants: ColorVariants;
	highlightToday?: boolean;
	getCompletedDates: (days: string[]) => Set<string>;
}

/**
 * Main calendar component.
 */
function Calendar(props: Props) {
	const {
		colorVariants,
		highlightToday,
		getCompletedDates,
	} = props;

	const now = new Date();
	const visibleMonthsCount = 2;

	// Set range boundaries
	const firstDay = new Date(now.getFullYear(), now.getMonth() - visibleMonthsCount + 1, 1);
	const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	// Get total days including start and end dates
	const daysCount = countDaysBetween(firstDay, lastDay) + 2;

	// Create date strings and get status set
	const datesRange = getDatesRange(daysCount, { from: firstDay });
	const completedSet = getCompletedDates(datesRange);

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${visibleMonthsCount}, 1fr)` }}
			className={styles.calendar}
		>
			{Array.from({ length: visibleMonthsCount }).map((_, i) => {
				const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);

				return (
					<Month
						key={monthDate.toISOString()}
						today={now}
						monthDate={monthDate}
						completedSet={completedSet}
						colorVariants={colorVariants}
						highlightToday={highlightToday}
					/>
				);
			}).reverse()} {/* Sort months from oldest to newest */}
		</div>
	);
}

export { Calendar };