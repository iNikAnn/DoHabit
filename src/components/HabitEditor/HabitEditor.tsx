import styles from '../../css/HabitEditor.module.css';

// react
import { KeyboardEventHandler, SubmitEventHandler, useEffect, useState } from 'react';

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

// types
import { HabitAction, HabitData } from '../../types/habit';

// utils
import checkHabitTitleExistence from '../../utils/checkHabitTitleExistence';
import scrollToTop from '../../utils/scrollToTop';

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
	const habit = isEditMode ? habits.find((habit) => habit.title === habitTitle) : undefined;

	const [inputTitle, setInputTitle] = useState<string>(isEditMode ? (habit?.title ?? '') : '');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	// TODO: use debounce
	useEffect(() => {
		setAlreadyExist(
			checkHabitTitleExistence(habits, inputTitle, habit)
		);
	}, [habit, habits, inputTitle]);

	// action object
	const payload = {
		habitId: habit?.title ?? ''
	};

	// on submit form
	const handleSabmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries()) as unknown as HabitData;

		inputTitle.length
			? handleUpdate({ type: isEditMode ? 'editHabit' : 'addHabit', payload: { ...payload, data } })
			: setAlreadyExist(true);

		if (!isEditMode) {
			scrollToTop();
		}
	};

	const handleUpdate = (action: HabitAction) => {
		habitsDispatch(action);
		navigate(-1);
	};

	// prevents form submission on Enter key press and hides the virtual keyboard
	const handlePressEnter: KeyboardEventHandler<HTMLFormElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (e.target) {
				(e.target as HTMLElement)?.blur();
			}
		}
	};

	// order
	const [currentOrder, setCurrentOrder] = useState(() => (
		habit ? filteredHabits.indexOf(habit) + 1 : -1
	));

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSabmitForm}
				onKeyDown={handlePressEnter}
			>
				<TitleBlock
					input={inputTitle ?? ''}
					onChange={setInputTitle}
					alreadyExist={alreadyExist}
				/>

				<FrequencyBlock
					currentFrequency={habit?.frequency}
				/>

				{isEditMode && (
					<OrderBlock
						habitsCount={filteredHabits.length}
						currentOrder={currentOrder}
						setCurrentOrder={setCurrentOrder}
					/>
				)}

				<ColorBlock
					habits={habits}
					currentColorIndex={habit?.colorIndex}
				/>

				<IconBlock
					habits={habits}
					currentIconTitle={habit?.iconTitle}
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
										handleUpdate({ type: 'deleteHabit', payload: { ...payload } });
									}
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
										handleUpdate({ type: 'archiveHabit', payload: { ...payload } });
									}
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