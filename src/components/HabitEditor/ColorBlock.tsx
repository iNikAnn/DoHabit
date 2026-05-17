import styles from '../../css/ColorBlock.module.css';
import { FaCheck } from 'react-icons/fa';
import { Habit } from '@entities/habit';
import { getAppPalette } from '@shared/lib';

interface Props {
	habits: Habit[];
	currentColorIndex?: number;
}

function ColorBlock({ habits, currentColorIndex = 0 }: Props) {
	const palette = getAppPalette();

	const colorList = palette.map(({ baseColor: color }, index) => {
		const isColorUsed = habits.find((habit) => Number(habit.colorIndex) === index);

		return (
			<label
				key={color}
				style={{
					backgroundColor: color,
					transform: isColorUsed ? 'scale(0.75)' : ''
				}}
			>
				<input
					type='radio'
					name='colorIndex'
					id={color}
					value={index}
					defaultChecked={index === currentColorIndex || !index}
				/>

				<FaCheck />
			</label>
		);
	});

	return (
		<section>
			<div className={styles.header}>
				<h3>Color</h3>
			</div>

			<div className={styles.colorList}>
				{colorList}
			</div>
		</section>
	);
}

export default ColorBlock;