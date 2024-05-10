import styles from '../css/CreateHabitWindow.module.css';

// react
import { useEffect, useState } from 'react';

//db
import dbColors from '../db/dbColors';

function CreateHabitWindow(props) {
	const {
		// 'on' functions
		onCreate,

		habits
	} = props;

	const [inputTitle, setInputTitle] = useState('');
	const [alreadyExist, setAlreadyExist] = useState(false);

	useEffect(() => {
		const match = habits.find((habit) => habit.title === inputTitle) || !inputTitle.length;

		if (match) {
			setAlreadyExist(true);
		} else {
			setAlreadyExist(false);
		};
	}, [inputTitle]);

	// colors
	const colors = dbColors.map((color, index) => {
		return (
			<label style={{ backgroundColor: color }}>
				<input type="radio" name="color" value={color} defaultChecked={!index} />
				<div className={styles.outline} />
			</label>
		);
	});

	return (
		<div className={styles.wrapper}>
			<h2>Create new habit</h2>

			<form
				className={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					onCreate(e.target)
				}}
			>
				<label className={styles.label}>
					<span className={styles.labelTitle}>Title:</span>

					<input type="text" name="title" id="title"
						className={`${styles.input} ${alreadyExist ? styles.alreadyExist : ''}`}
						value={inputTitle}
						onChange={(e) => setInputTitle(e.target.value)}
						placeholder="Enter habit title"
					/>
				</label>

				<label className={styles.label}>
					<span className={styles.labelTitle}>Color:</span>

					<div className={styles.colors}>
						{colors}
					</div>
				</label>

				<button type='submit' disabled={alreadyExist}>
					Create
				</button>
			</form>
		</div>
	);
}

export default CreateHabitWindow;