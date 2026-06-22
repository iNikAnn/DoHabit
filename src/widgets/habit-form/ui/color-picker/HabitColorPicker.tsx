import styles from './HabitColorPicker.module.css';
import { useTranslation } from 'react-i18next';
import { type Habit } from '@entities/habit';
import { getAppPalette } from '@shared/lib/theme';
import { SectionHeader } from '@shared/ui';

interface Props {
	habits: Habit[];
	initialColorIndex?: number;
}

function HabitColorPicker({ habits, initialColorIndex = 0 }: Props) {
	const { t } = useTranslation();
	const palette = getAppPalette();
	const usedColors = new Set(habits.map((h) => h.colorIndex));

	const colorList = palette.map(({ baseColor, style }, index) => {
		const isUsed = usedColors.has(index);

		return (
			<label
				key={`${baseColor}-${style['--hue']}`}
				style={{ backgroundColor: baseColor, ...style }}
				className={`paletteItem ${styles.label}`}
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
				title={t('habits.form.colorTitle')}
				description={habits.length > 0
					? t('habits.form.colorDesc')
					: undefined}
			/>

			<div className={styles.colorList}>
				{colorList}
			</div>
		</section>
	);
}

export default HabitColorPicker;