// import styles from './CompactCalendar.module.css';
import { useEffect, useMemo, useRef } from 'react';
// import clsx from 'clsx';
import { formatDate, getDatesRange } from '@shared/lib/date-time';

interface Props {
	weeksCount?: number;
	highlightToday?: boolean;
	getCompletedDates: (days: string[]) => Set<string>;
}

const CELL_SIZE = 15;
const GAP = 3;
const RADIUS = 2;

/**
 * Renders weeks as columns starting from Monday.
 */
function CompactCalendar(props: Props) {
	const {
		weeksCount = 20,
		highlightToday,
		getCompletedDates
	} = props;

	const now = new Date();
	const todayStr = formatDate(now);
	const currentDayIndex = now.getDay();

	// Total days: full previous weeks + days in current week
	const totalDays = 7 * (weeksCount - 1) + (currentDayIndex || 7);

	const dateRange = useMemo(
		() => getDatesRange(totalDays, { to: todayStr }),
		[todayStr, totalDays]
	);

	// Group into weeks (columns)
	const weeks = useMemo(() => {
		const arr: string[][] = [];
		for (let i = 0; i < dateRange.length; i += 7) {
			arr.push(dateRange.slice(i, i + 7));
		}
		return arr;
	}, [dateRange]);

	const completedSet = getCompletedDates(dateRange);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasWidth = weeks.length * (CELL_SIZE + GAP) - GAP;
	const canvasHeight = 7 * (CELL_SIZE + GAP) - GAP;

	/**
	 * Renders the habit calendar grid onto the canvas.
	 */
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.style.borderColor = 'var(--color-primary)';
		canvas.style.color = 'var(--habit-color-base)';
		canvas.style.backgroundColor = 'var(--habit-color-dark)';

		const {
			borderColor: strokeColor,
			color: baseColor,
			backgroundColor: darkColor
		} = getComputedStyle(canvas);

		canvas.style.borderColor = '';
		canvas.style.color = '';
		canvas.style.backgroundColor = '';

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		weeks.forEach((week, weekIndex) => {
			week.forEach((day, dayIndex) => {
				const isToday = day === todayStr;
				const isCompleted = completedSet.has(day);

				const x = weekIndex * (CELL_SIZE + GAP);
				const y = dayIndex * (CELL_SIZE + GAP);

				ctx.fillStyle = isCompleted ? baseColor : darkColor;

				ctx.beginPath();
				ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, RADIUS);
				ctx.fill();

				if (isToday && highlightToday) {
					ctx.strokeStyle = strokeColor;
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.roundRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2, RADIUS);
					ctx.stroke();
				}
			});
		});
	}, [canvasHeight, canvasWidth, completedSet, highlightToday, todayStr, weeks]);

	return (
		<canvas
			ref={canvasRef}
			width={canvasWidth}
			height={canvasHeight}
			style={{
				display: 'block',
				width: '100%',
				height: 'auto',
				imageRendering: 'pixelated'
			}}
		/>
	);

	// TODO: Remove this legacy DOM-based rendering after verifying canvas stability and performance
	// return (
	// 	<div
	// 		style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
	// 		className={styles.calendar}
	// 	>
	// 		{weeks.map((week, weekIndex) => (
	// 			<div key={weekIndex} className={styles.week}>
	// 				{week.map((date) => {
	// 					const isToday = date === todayStr;
	// 					const isCompleted = completedSet.has(date);

	// 					return (
	// 						<div
	// 							key={date}
	// 							style={{
	// 								backgroundColor: isCompleted
	// 									? 'var(--habit-color-base)'
	// 									: 'var(--habit-color-dark)',
	// 							}}
	// 							className={clsx(
	// 								styles.day,
	// 								(isToday && highlightToday) && styles.today
	// 							)}
	// 						/>
	// 					);
	// 				})}
	// 			</div>
	// 		))}
	// 	</div>
	// );
}

export { CompactCalendar };