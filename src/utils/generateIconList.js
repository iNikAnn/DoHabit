function generateIconList(habits, icons, end, styles, currentIcon) {
	// currentIcon is used in habit editing mode
	if (currentIcon) {
		currentIcon = icons.find((el) => {
			if (Array.isArray(el)) {
				if (el[0] === currentIcon) {
					return el;
				};
			};
		});
	};

	const indexOfCurrentIcon = currentIcon ? icons.indexOf(currentIcon) : -1;

	const iconList = [];
	end = end ? 14 : icons.length;

	for (let index = 0; index < end; index++) {
		if (typeof icons[index] === 'string') {
			iconList.push(
				<div
					className={styles.iconCategory}
				>
					<small>{icons[index]}</small>
				</div>
			);

			continue;
		};

		const [iconTitle, icon] = icons[index];
		const isIconUsed = habits.find((habit) => habit.iconTitle === iconTitle);

		iconList.push(
			<label style={{ transform: isIconUsed ? 'scale(0.75)' : '' }}>
				<input
					type="radio"
					name="iconTitle"
					id="iconTitle"
					value={iconTitle}
					defaultChecked={index === indexOfCurrentIcon || (!currentIcon && !index)}
				/>

				<div className={styles.iconBg} />

				{icon}
			</label>
		);
	};

	return iconList;
}

export default generateIconList;