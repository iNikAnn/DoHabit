function generateColorList(habits, colors, icon, currentColorIndex) {
	return colors.map((color, index) => {
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

				{icon}
			</label>
		);
	});
}

export default generateColorList;