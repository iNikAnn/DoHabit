import styles from '../css/CreateHabitWindow.module.css';

// react
import { useEffect, useState } from 'react';

// icons
import { FaCheck } from "react-icons/fa";

//db
import dbColors from '../db/dbColors';

function CreateHabitWindow(props) {
	const {
		// 'on' functions
		onCreate,

		// db
		icons,

		habits
	} = props;

	const [inputTitle, setInputTitle] = useState('');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	useEffect(() => {
		const match = habits.find((habit) => habit.title === inputTitle);
		setAlreadyExist(match);
	}, [inputTitle]);

	// on submit form
	const handleSabmitForm = (e) => {
		e.preventDefault();

		if (inputTitle.length) {
			onCreate(e.target);
		} else {
			setAlreadyExist(true);
		};
	};

	// colors
	const colors = dbColors.map((color, index) => {
		return (
			<label style={{ backgroundColor: color }}>
				<input type="radio" name="color" id="color" value={color} defaultChecked={!index} />
				<div className={styles.checkMark}>
					<FaCheck />
				</div>
			</label>
		);
	});

	// icons
	const habitIcons = icons.map(([iconTitle, icon], index) => {
		return (
			<label>
				<input type="radio" name="iconTitle" id="iconTitle" value={iconTitle} defaultChecked={!index} />
				<div className={styles.iconBg} />
				{icon}
			</label>
		);
	});

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={(e) => handleSabmitForm(e)}
			>
				<label className={styles.label}>
					<div className={styles.labelHeader}><h3>Title</h3></div>

					<input type="text" name="title" id="title"
						className={`${styles.input} ${alreadyExist ? styles.alreadyExist : ''}`}
						value={inputTitle}
						onChange={(e) => setInputTitle(e.target.value)}
						placeholder="Enter habit title"
					/>
				</label>

				<label className={styles.label}>
					<div className={styles.labelHeader}><h3>Color</h3></div>

					<div className={styles.colors}>
						{colors}
					</div>
				</label>

				<label className={styles.label}>
					<div className={styles.labelHeader}>
						<h3>Icon</h3>
						<button type='button' className={styles.showMoreIconsBtn}>Show more icons</button>
					</div>

					<div className={styles.icons}>
						{habitIcons}
					</div>
				</label>

				<button
					className={styles.createBtn}
					type='submit'
					disabled={alreadyExist}
				>
					Create
				</button>
			</form>
		</div>
	);
}

export default CreateHabitWindow;