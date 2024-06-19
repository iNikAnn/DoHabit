import styles from '../../css/HabitEditor.module.css';

// react
import { useEffect, useState } from 'react';

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
import { FaPlusSquare } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

function HabitEditor(props) {
	const {
		habits, habitTitle,

		// 'on' functions
		onUpdate, onClose,

		// db
		dbIcons, dbColors
	} = props;

	const isEditMode = Boolean(habitTitle);
	const habit = isEditMode ? habits.find((habit) => habit.title === habitTitle) : null;

	const [inputTitle, setInputTitle] = useState(isEditMode ? habit.title : '');
	const [alreadyExist, setAlreadyExist] = useState(false);

	// check for existing habit with the same title
	useEffect(() => {
		setAlreadyExist(
			checkHabitTitleExistence(habits, habit, inputTitle)
		);
	}, [habit, habits, inputTitle]);

	// update props
	const updateProps = {
		habitTitle: habit?.title
	};

	// on submit form
	const handleSabmitForm = (e) => {
		e.preventDefault();

		inputTitle.length
			? handleUpdate({ ...updateProps, data: e.target, mode: isEditMode ? 'edit' : '' })
			: setAlreadyExist(true);
	};

	const handleUpdate = (props) => {
		onUpdate(props);
		onClose();
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
		isEditMode ? habits.indexOf(habit) + 1 : -1
	));

	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSabmitForm}
				onKeyDown={handlePressEnter}
			>
				<TitleBlock input={inputTitle} onChange={(newTitle) => setInputTitle(newTitle)} alreadyExist={alreadyExist} />

				<FrequencyBlock {...{ currentFrequency: habit?.frequency }} />

				{isEditMode && (
					<OrderBlock habitsCount={habits.length} currOrder={currOrder} setCurrOrder={setCurrOrder} />
				)}

				<ColorBlock {...{ habits, dbColors, currentColorIndex: habit?.colorIndex }} />

				<IconBlock {...{ habits, dbIcons, currentIconTitle: habit?.iconTitle }} />

				<small className={styles.info}>
					"Color" and "Icon" icons in reduced size indicate that they have been previously used (but can be reused).
				</small>

				<div className={styles.btnsWrapper}>
					{isEditMode && (
						<Button
							icon={<RiDeleteBinFill />}
							text="Delete Habit"
							bgColor="IndianRed"
							onClick={() => {
								const msg = 'Are you sure you want to delete this habit? Deleted data cannot be recovered.';
								if (window.confirm(msg)) {
									handleUpdate({ ...updateProps, mode: 'delete' });
								}
							}}
						/>
					)}

					<Button
						type="submit"
						icon={<FaPlusSquare />}
						text={isEditMode ? 'Save Changes' : 'Create Habit'}
						disabled={alreadyExist}
					/>
				</div>
			</form>
		</div>
	);
}

export default HabitEditor;