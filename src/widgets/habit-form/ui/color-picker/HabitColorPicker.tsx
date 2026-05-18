import styles from './HabitColorPicker.module.css';
import { Habit } from '@entities/habit';
import { getAppPalette } from '@shared/lib';
import { SectionHeader } from '@shared/ui';

interface Props {
	habits: Habit[];
	initialColorIndex?: number;
}

function HabitColorPicker({ habits, initialColorIndex = 0 }: Props) {
	const palette = getAppPalette();
	const usedColors = new Set(habits.map((h) => h.colorIndex));

	const colorList = palette.map(({ baseColor }, index) => {
		const isUsed = usedColors.has(index);

		return (
			<label
				key={baseColor}
				style={{ backgroundColor: baseColor }}
				className={styles.label}
			>
				<input
					type='radio'
					name='colorIndex'
					id={baseColor}
					value={index}
					defaultChecked={index === initialColorIndex || !index}
				/>

				<div className={styles.checkmark} />

				{isUsed && (
					<div className={styles.usedIndicator} />
				)}
			</label>
		);
	});

	return (
		<section>
			<SectionHeader
				title='Color'
				description={habits.length > 0
					? 'Dots mark colors already in use. You can still reuse them.'
					: undefined}
			/>

			<div className={styles.colorList}>
				{colorList}
			</div>
		</section>
	);
}

export default HabitColorPicker;