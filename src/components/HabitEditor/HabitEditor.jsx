import styles from '../../css/HabitEditor.module.css';

// react
import { useEffect, useState } from 'react';

// components
import TitleBlock from './TitleBlock';
import OrderBlock from './OrderBlock';
import ColorBlock from './ColorBlock';
import IconBlock from './IconBlock';

function HabitEditor(props) {
	const {
		modeObj,
		habits,

		// 'on' functions
		onUpdate,

		// db
		dbIcons,
		dbColors
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
	const handleSabmitForm = (event) => {
		event.preventDefault();

		if (inputTitle.length) {
			onUpdate(event.target, mode, mode === 'edit' ? habit.title : '');
		} else {
			setAlreadyExist(true);
		};
	};

	// prevents form submission on Enter key press and hides the virtual keyboard
	const handlePressEnter = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.target.blur();
		};
	};

	// order
	const [currOrder, setCurrOrder] = useState(() => {
		if (mode === 'edit') {
			return habits.indexOf(habit) + 1;
		};

		return -1;
	});

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSabmitForm}
				onKeyDown={handlePressEnter}
			>
				<TitleBlock input={inputTitle} onChange={(newTitle) => setInputTitle(newTitle)} alreadyExist={alreadyExist} />

				{mode === 'edit' && (
					<OrderBlock habitsCount={habits.length} currOrder={currOrder} setCurrOrder={setCurrOrder} />
				)}

				<ColorBlock {...{ habits, dbColors, currentColorIndex: habit?.colorIndex }} />

				<IconBlock {...{ habits, dbIcons, currentIconTitle: habit?.iconTitle }} />

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