import styles from '../../css/ColorBlock.module.css';

// icon
import { FaCheck } from "react-icons/fa";

function ColorBlock({ habits, dbColors, currentColorIndex }) {
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
					type="radio"
					name="colorIndex"
					id={color}
					value={index}
					defaultChecked={index === Number(currentColorIndex) || !index}
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