import styles from './HabitForm.module.css';
import { type KeyboardEventHandler, type SubmitEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import { MdAddToPhotos } from 'react-icons/md';
import HabitTitleInput from './title-input/HabitTitleInput';
import HabitFrequencyField from './frequency-field/HabitFrequencyField';
import HabitColorPicker from './color-picker/HabitColorPicker';
import HabitIconPicker from './icon-picker/HabitIconPicker';
import HabitOrderField from './order-field/HabitOrderField';
import HabitExtraActions from './extra-actions/HabitExtraActions';
import useHabitDuplicate from '../lib/useHabitDuplicate';
import { type HabitData, useHabitsStore } from '@entities/habit';
import { scrollToTop } from '@shared/lib/dom';
import { Button } from '@shared/ui';

interface HabitFormProps {
	habitId?: string;
}

/**
 * Habit creation and editing form.
 */
function HabitForm({ habitId }: HabitFormProps) {
	const navigate = useNavigate();

	// Form state
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Store data
	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	// Derived state
	const isEditMode = Boolean(habitId);
	const currentHabit = isEditMode ? habits.find((h) => h.id === habitId) : undefined;

	// Title state & validation hook
	const [title, setTitle] = useState(currentHabit?.title ?? '');
	const isDuplicate = useHabitDuplicate(habits, title, isSubmitting, currentHabit);

	// Handles form submission, dispatches action, and navigates back
	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formData = new FormData(e.currentTarget);
		const habitData = Object.fromEntries(formData.entries()) as unknown as HabitData;

		const payload = {
			habitId: currentHabit?.id ?? '',
			data: habitData
		};

		habitsDispatch({
			type: isEditMode ? 'editHabit' : 'addHabit',
			payload
		});

		if (!isEditMode) scrollToTop();

		navigate('/');
	};

	// Prevents form submission on Enter key press and hides the virtual keyboard
	const handlePressEnter: KeyboardEventHandler<HTMLFormElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (e.target) {
				(e.target as HTMLElement)?.blur();
			}
		}
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
			onKeyDown={handlePressEnter}
		>
			<HabitTitleInput
				input={title}
				isDuplicate={isDuplicate}
				onChange={setTitle}
			/>

			<HabitFrequencyField
				initialFrequency={currentHabit?.frequency}
			/>

			{(isEditMode && currentHabit) && (
				<HabitOrderField
					habits={habits}
					habit={currentHabit}
				/>
			)}

			<HabitColorPicker
				habits={habits}
				initialColorIndex={currentHabit?.colorIndex}
			/>

			<HabitIconPicker
				habits={habits}
				initialIconTitle={currentHabit?.iconTitle}
			/>

			<div className={styles.submitButtonWrapper}>
				{(isEditMode && habitId) && (
					<HabitExtraActions
						habitId={habitId}
						onSuccess={(() => navigate('/'))}
					/>
				)}

				<Button
					type='submit'
					icon={<MdAddToPhotos />}
					className={styles.submitButton}
					disabled={title.trim().length === 0 || isDuplicate}
				>
					{isEditMode ? 'Save Changes' : 'Create Habit'}
				</Button>
			</div>
		</form>
	);
}

export { HabitForm };
