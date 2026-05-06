import styles from '../../css/ColorBlock.module.css';
import { useColorsStore } from '../../stores/colorsStore';
import { Habit } from '@entities/habit';
import { FaCheck } from 'react-icons/fa';

interface Props {
	habits: Habit[];
	currentColorIndex?: number;
}

function ColorBlock({ habits, currentColorIndex = 0 }: Props) {

	const dbColors = useColorsStore((s) => s.colors);

	const colorList = dbColors.map((color, index) => {
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