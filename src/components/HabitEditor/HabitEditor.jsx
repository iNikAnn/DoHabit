import styles from '../../css/HabitEditor.module.css';

// react
import { useEffect, useState } from 'react';

// components
import OrderBlock from './OrderBlock';

// utils
import generateColorList from '../../utils/generateColorList';
import generateIconList from '../../utils/generateIconList';

// icons
import { FaCheck } from "react-icons/fa";

//db
import dbColors from '../../db/dbColors';

function HabitEditor(props) {
	const {
		modeObj,
		habits,

		// 'on' functions
		onUpdate,

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
		const currentHabitTitle = habit ? habit.title : '';
		const match = habits.find((habit) => {
			return habit.title === inputTitle && habit.title !== currentHabitTitle;
		});

		setAlreadyExist(match);
	}, [inputTitle]);

	// on submit form
	const handleSabmitForm = (e) => {
		e.preventDefault();

		if (inputTitle.length) {
			onUpdate(e.target, mode, mode === 'edit' ? habit.title : '');
		} else {
			setAlreadyExist(true);
		};
	};

	// order
	const [currOrder, setCurrOrder] = useState(() => {
		if (mode === 'edit') {
			return habits.indexOf(habit) + 1;
		};

		return -1;
	});

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

				{mode === 'edit' && (
					<OrderBlock habitsCount={habits.length} currOrder={currOrder} setCurrOrder={setCurrOrder} />
				)}

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

				<div className={styles.btnsWrapper}>
					{mode === 'edit' && (
						<button
							className={styles.deleteBtn}
							type="button"
							onClick={() => {
								const msg = 'Are you sure you want to delete this habit? Deleted data cannot be recovered.';
								if (window.confirm(msg)) {
									onUpdate(null, 'delete', habit.title)
								}
							}}
						>
							Delete Habit
						</button>
					)}

					<button
						className={styles.createBtn}
						type="submit"
						disabled={alreadyExist}
					>
						{mode === 'edit' ? 'Save Changes' : 'Create Habit'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default HabitEditor;