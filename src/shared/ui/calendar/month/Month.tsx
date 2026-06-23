// import styles from './Month.module.css';
import { useEffect, useRef } from 'react';
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

const DPR = window.devicePixelRatio ?? 1;
const COLS = 7;
const GAP = 3;
const RADIUS = 5;

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
	const lang = i18n.language;

	const year = monthDate.getFullYear();
	const month = monthDate.getMonth();
	const monthStr = String(month + 1).padStart(2, '0');
	const weekdayLables = getWeekdayLabels(lang, { length: lang === 'zh' ? 'narrow' : 'short' });

	// Get total days and empty cells before first day
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const shift = (new Date(year, month, 1).getDay() || 7) - 1;
	const totalCells = shift + daysInMonth;
	const rows = Math.ceil(totalCells / COLS) + (showDayNames ? 1 : 0);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	/**
	 * Renders the habit calendar grid onto the canvas.
	 */
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const logicalWidth = canvas.clientWidth;
		const cellSize = (logicalWidth - GAP * (COLS - 1)) / COLS;
		const logicalHeight = rows * (cellSize + GAP) - GAP;

		canvas.width = logicalWidth * DPR;
		canvas.height = logicalHeight * DPR;

		canvas.style.borderColor = 'var(--color-primary)';
		canvas.style.color = 'var(--habit-color-base)';
		canvas.style.backgroundColor = 'var(--habit-color-dark)';
		canvas.style.accentColor = 'var(--habit-color-soft)';

		const {
			borderColor: strokeColor,
			color: baseColor,
			backgroundColor: darkColor,
			accentColor: softColor
		} = getComputedStyle(canvas);

		canvas.style.borderColor = '';
		canvas.style.color = '';
		canvas.style.backgroundColor = '';

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(DPR, DPR);
		ctx.clearRect(0, 0, logicalWidth, logicalHeight);

		const fontSize = cellSize * 0.55;
		const fontOffset = fontSize * 0.08;

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = `bold ${fontSize}px monospace`;

		let shiftY = 0;

		if (showDayNames) {
			for (let i = 0; i < 7; i++) {
				const x = i * (cellSize + GAP);
				const isToday = ((i + 1) % COLS) === today.getDay();
				const isCurrentMonth = today.getMonth() === month;

				const label = startCase(weekdayLables[i].slice(0, 2));

				ctx.fillStyle = (isToday && isCurrentMonth) ? strokeColor : softColor;
				ctx.fillText(label, x + cellSize / 2, shiftY + cellSize / 2);
			}

			shiftY += cellSize + GAP;
		}

		for (let i = 0; i < totalCells; i++) {
			if (i < shift) continue;

			const col = i % COLS;
			const row = Math.floor(i / COLS);
			const x = col * (cellSize + GAP);
			const y = shiftY + row * (cellSize + GAP);

			const dayNum = i - shift + 1;
			const dayStr = `${year}-${monthStr}-${String(dayNum).padStart(2, '0')}`;

			const isToday = dayStr === formatDate(today);
			const isCompleted = completedSet.has(dayStr);

			ctx.fillStyle = isCompleted ? baseColor : darkColor;

			ctx.beginPath();
			ctx.roundRect(x, y, cellSize, cellSize, RADIUS);
			ctx.fill();

			if (isToday && highlightToday) {
				ctx.strokeStyle = strokeColor;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, RADIUS);
				ctx.stroke();
			}

			if (showDayNumbers) {
				ctx.fillStyle = isCompleted ? strokeColor : softColor;
				ctx.fillText(String(dayNum), x + cellSize / 2, y + cellSize / 2 + fontOffset);
			}
		}
	}, [completedSet, highlightToday, month, monthStr, rows, shift, showDayNames, showDayNumbers, today, totalCells, weekdayLables, year]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				display: 'block',
				width: '100%',
				height: 'auto'
			}}
		/>
	);

	// TODO: Remove this legacy DOM-based rendering after verifying canvas stability and performance
	// const days = Array.from({ length: totalCells }, (_, i) => {
	// 	// Render empty slots for correct weekday alignment
	// 	if (i < shift) return <div key={`empty-${i}`} className={styles.day} />;

	// 	const dayNum = i - shift + 1;
	// 	const dayStr = `${year}-${monthStr}-${String(dayNum).padStart(2, '0')}`;

	// 	const isToday = dayStr === formatDate(today);
	// 	const isCompleted = completedSet.has(dayStr);

	// 	return (
	// 		<div
	// 			key={dayNum}
	// 			style={{
	// 				color: isCompleted
	// 					? 'inherit'
	// 					: 'var(--habit-color-soft)',
	// 				backgroundColor: isCompleted
	// 					? 'var(--habit-color-base)'
	// 					: 'var(--habit-color-dark)',
	// 				outline: (isToday && highlightToday) ? '2px solid var(--color-primary)' : '',
	// 				outlineOffset: '-2px',
	// 			}}
	// 			className={styles.day}
	// 		>
	// 			{showDayNumbers && dayNum}
	// 		</div>
	// 	);
	// });

	// const weekdays = showDayNames
	// 	? weekdayLables.map((weekday, index) => {
	// 		const isToday = ((index + 1) % 7) === today.getDay();
	// 		const isCurrentMonth = today.getMonth() === monthDate.getMonth();

	// 		return (
	// 			<div
	// 				key={weekday}
	// 				style={{
	// 					color: (isToday && isCurrentMonth)
	// 						? 'inherit'
	// 						: 'var(--habit-color-soft)',
	// 				}}
	// 				className={styles.weekday}
	// 			>
	// 				{startCase(weekday.slice(0, 2))}
	// 			</div>
	// 		);
	// 	})
	// 	: null;

	// return (
	// 	<div className={styles.month}>
	// 		{showDayNames && (
	// 			<div className={styles.weekdaysGrid}>
	// 				{weekdays}
	// 			</div>
	// 		)}

	// 		<div className={styles.daysGrid}>
	// 			{days}
	// 		</div>
	// 	</div>
	// );
}

export default Month;