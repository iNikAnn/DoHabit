import styles from '../../css/HabitEditor.module.css';

// react
import { useEffect, useState } from 'react';

// router
import { useLocation, useNavigate } from 'react-router-dom';

// stores
import { useHabitsStore } from '../../stores/habitsStore';

// components
import TitleBlock from './TitleBlock';
import FrequencyBlock from './FrequencyBlock';
import OrderBlock from './OrderBlock';
import ColorBlock from './ColorBlock';
import IconBlock from './IconBlock';
import Button from '../Button';

// utils
import checkHabitTitleExistence from '../../utils/checkHabitTitleExistence';

// icons
import { MdAddToPhotos } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

function HabitEditor() {

	const location = useLocation();
	const navigate = useNavigate();

	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const habitTitle = location.state?.habitTitle;
	const isEditMode = Boolean(habitTitle);
	const filteredHabits = isEditMode ? habits.filter((h) => !h.isArchived) : [];
	const habit = isEditMode ? habits.find((habit) => habit.title === habitTitle) : null;

	const [inputTitle, setInputTitle] = useState(isEditMode ? habit?.title : '');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	useEffect(() => {
		setAlreadyExist(
			checkHabitTitleExistence(habits, habit, inputTitle)
		);
	}, [habit, habits, inputTitle]);

	// action object
	const actionObj = {
		habitTitle: habit?.title
	};

	// on submit form
	const handleSabmitForm = (e) => {
		e.preventDefault();

		inputTitle.length
			? handleUpdate({ ...actionObj, data: e.target, type: isEditMode ? 'editHabit' : 'addHabit' })
			: setAlreadyExist(true);
	};

	const handleUpdate = (props) => {
		habitsDispatch(props);
		navigate(-1);
	};

	// prevents form submission on Enter key press and hides the virtual keyboard
	const handlePressEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
		};
	};

	// order
	const [currOrder, setCurrOrder] = useState(() => (
		isEditMode ? filteredHabits.indexOf(habit) + 1 : -1
	));

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSabmitForm}
				onKeyDown={handlePressEnter}
			>
				<TitleBlock
					input={inputTitle}
					onChange={(newTitle) => setInputTitle(newTitle)}
					alreadyExist={alreadyExist}
				/>

				<FrequencyBlock
					{...{ currentFrequency: habit?.frequency }}
				/>

				{isEditMode && (
					<OrderBlock
						habitsCount={filteredHabits.length}
						currOrder={currOrder}
						setCurrOrder={setCurrOrder}
					/>
				)}

				<ColorBlock
					{...{ habits, currentColorIndex: habit?.colorIndex }}
				/>

				<IconBlock
					{...{ habits, currentIconTitle: habit?.iconTitle }}
				/>

				<small
					// style={{ paddingBottom: isEditMode ? '8rem' : '5rem' }}
					className={styles.info}
				>
					'Color' and 'Icon' icons in reduced size indicate that they have been previously used (but can be reused).
				</small>

				<div className={styles.btnsWrapper}>
					{isEditMode && (
						<div className={styles.extraBtnsWrapper}>
							<Button
								icon={<MdDeleteForever />}
								text='Delete Habit'
								color='IndianRed'
								// bgColor='IndianRed'
								bgColor='var(--bg-color-primary)'
								onClick={() => {
									const msg = 'Are you sure you want to delete this habit? Deleted data cannot be recovered.';

									if (window.confirm(msg)) {
										handleUpdate({ ...actionObj, type: 'deleteHabit' });
									};
								}}
							/>

							<Button
								icon={<HiArchiveBoxArrowDown />}
								text='Archive Habit'
								// bgColor='#7b68ee'
								bgColor='var(--bg-color-primary)'
								onClick={() => {
									const msg = 'Are you sure you want to archive this habit? Archived habits can be found in the menu under the \'Archive\' section.';

									if (window.confirm(msg)) {
										handleUpdate({ ...actionObj, type: 'archiveHabit' });
									};
								}}
							/>
						</div>
					)}

					<Button
						type='submit'
						icon={<MdAddToPhotos />}
						text={isEditMode ? 'Save Changes' : 'Create Habit'}
						color='#e6e6e6'
						disabled={alreadyExist}
					/>
				</div>
			</form>
		</div>
	);
}

export default HabitEditor;