import styles from '../css/CreateHabitWindow.module.css';

// react
import { useEffect, useState } from 'react';

// utils
import generateColorList from '../utils/generateColorList';
import generateIconList from '../utils/generateIconList';

// icons
import { FaCheck } from "react-icons/fa";

//db
import dbColors from '../db/dbColors';

function CreateHabitWindow(props) {
	const {
		modeObj,
		habits,

		// 'on' functions
		onCreate,

		// db
		icons,
	} = props;

	let mode = '';
	let habit = '';

	if (modeObj) {
		mode = modeObj.mode;
		habit = habits.find((habit) => habit.title === modeObj.habitTitle);
	};

	const [inputTitle, setInputTitle] = useState(mode === 'edit' ? habit.title : '');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	useEffect(() => {
		const currentHabitTitle = habit.title;
		const match = habits.find((habit) => {
			return habit.title === inputTitle && habit.title !== currentHabitTitle;
		});

		setAlreadyExist(match);
	}, [inputTitle]);

	// on submit form
	const handleSabmitForm = (e) => {
		e.preventDefault();

		if (inputTitle.length) {
			onCreate(e.target, mode, mode === 'edit' ? habit.title : '');
		} else {
			setAlreadyExist(true);
		};
	};

	// colors
	const colors = generateColorList(habits, dbColors, <FaCheck />, styles, mode === 'edit' ? habit.color : '');

	// icons
	const [hideAdditionalIcons, setHideAdditionalIcons] = useState(true);
	const habitIcons = generateIconList(habits, icons, hideAdditionalIcons, styles, mode === 'edit' ? habit.iconTitle : '');

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
						<button
							type='button'
							className={styles.showMoreIconsBtn}
							onClick={() => setHideAdditionalIcons((state) => !state)}
						>
							{'Show ' + (hideAdditionalIcons ? 'more' : 'less')}
						</button>
					</div>

					<div className={styles.icons}>
						{habitIcons}
					</div>
				</label>

				<small className={styles.info}>
					"Color" and "Icon" icons in reduced size indicate that they have been previously used (but can be reused).
				</small>

				<button
					className={styles.createBtn}
					type='submit'
					disabled={alreadyExist}
				>
					{mode === 'edit' ? 'Save Changes' : 'Create Habit'}
				</button>
			</form>
		</div>
	);
}

export default CreateHabitWindow;