function generateIconList(db, end, styles) {
	const iconList = [];
	end = end ? 14 : db.length;

	for (let index = 0; index < end; index++) {
		if (typeof db[index] === 'string') {
			iconList.push(
				<div
					className={styles.iconCategory}
				>
					<small>{db[index]}</small>
				</div>
			);

			continue;
		};

		const [iconTitle, icon] = db[index];

		iconList.push(
			<label>
				<input
					type="radio"
					name="iconTitle"
					id="iconTitle"
					value={iconTitle}
					defaultChecked={!index}
				/>

				<div className={styles.iconBg} />

				{icon}
			</label>
		);
	};

	return iconList;
}

export default generateIconList;