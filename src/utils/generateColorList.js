function generateColorList(habits, colors, icon, styles) {
	return colors.map((color, index) => {
		const isColorUsed = habits.find((habit) => habit.color === color);

		return (
			<label style={{
				backgroundColor: color,
				transform: isColorUsed ? 'scale(0.75)' : ''
			}}
			>
				<input
					type="radio"
					name="color"
					id="color"
					value={color}
					defaultChecked={!index}
				/>

				<div className={styles.checkMark}>
					{icon}
				</div>
			</label>
		);
	});
}

export default generateColorList;