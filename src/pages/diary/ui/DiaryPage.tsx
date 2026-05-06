import styles from './DiaryPage.module.css';

// react
import { useEffect, useRef, useState } from 'react';

// router
import { useLocation } from 'react-router-dom';

// stores
import { useColorsStore } from '../../../stores/colorsStore';
import { useHabitsStore } from '../../../stores/habitsStore';
import { useMainDiaryStore } from '../../../stores/mainDiaryStore';

// components
import { Placeholder } from '@shared/ui';
import NoteList from '../../../components/Diary/NoteList';
import AddNoteForm from '../../../components/Diary/AddNoteForm';

// icons
import { InformationIcon } from '@shared/assets';
import { MdStickyNote2 } from 'react-icons/md';

import { HabitAction } from '../../../types/habit';
import { Note } from '../../../types/diary';

/**
 * Main notes feed. Handles global entries or habit-specific filtering.
 */
function DiaryPage() {

	const location = useLocation();

	const dbColors = useColorsStore((s) => s.colors);

	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const mainDiaryDispatch = useMainDiaryStore((s) => s.mainDiaryDispatch);

	const [habitTitle] = useState(location.state?.habitTitle);
	const [accentColor] = useState(dbColors[location.state?.colorIndex]);

	// form
	const [input, setInput] = useState('');
	const [isFormActive, setIsFormActive] = useState(false);
	const [isEditing, setIsEditing] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const currentStreak = location.state?.currentStreak ?? 0;

	const diary = habitTitle
		? habits.find((h) => h.title === habitTitle)?.diary
		: mainDiary;

	const hasNotes = diary && typeof diary === 'object' && diary.length;

	// create new note
	const handleAddNote = (text: string) => {
		const note: Note = {
			text: text.trim(),
			date: String(new Date()),
			streak: currentStreak ?? undefined
		};

		const action: HabitAction = {
			type: 'addNote',
			payload: {
				habitId: habitTitle,
				note
			}
		};

		if (habitTitle) {
			habitsDispatch(action);
		} else {
			mainDiaryDispatch(action);
		}

		document.body
			.querySelector('#modalChildrenWrapper')
			?.scrollTo({
				top: 0,
				behavior: 'smooth'
			});

		handleFormActivation(false);
	};

	// edit note
	const handleStartEdit = (noteCreationDate: string, currentText: string) => {
		if (inputRef.current) {
			setIsEditing(noteCreationDate);
			setInput(currentText);
			inputRef.current.focus();
		}
	};

	const handleEditNote = (newText: string) => {
		const action: HabitAction = {
			type: 'editNote',
			payload: {
				// TODO: Switch to ID once implemented
				habitId: habitTitle,
				noteCreationDate: isEditing,
				newText: newText.trim()
			}
		};

		if (habitTitle) {
			habitsDispatch(action);
		} else {
			mainDiaryDispatch(action);
		}

		setIsEditing('');
		handleFormActivation(false);
	};

	// delete note
	// TODO: Switch to ID once implemented
	const handleDeleteNote = (noteCreationDate: string) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			const action: HabitAction = {
				type: 'deleteNote',

				payload: {
					// TODO: Switch to ID once implemented
					habitId: habitTitle,
					noteCreationDate
				}
			};

			if (habitTitle) {
				habitsDispatch(action);
			} else {
				mainDiaryDispatch(action);
			}
		}
	};

	const handleFormActivation = (boolean: boolean) => setIsFormActive(boolean);

	useEffect(
		() => {
			if (isFormActive && inputRef.current) {
				inputRef.current.focus();
			}
		},
		[isFormActive]
	);

	return (
		<div className={styles.diary}>
			{hasNotes ? (
				<NoteList
					diary={diary}
					onStartEditNote={handleStartEdit}
					onDeleteNote={handleDeleteNote}
				/>
			) : (
				<Placeholder
					content={{
						image: <InformationIcon />,
						title: (habitTitle ? 'This habit\'s' : 'Main') + ' diary is empty',
						description: 'Add your first note to start tracking your progress and thoughts.'
					}}
					action={{
						label: 'Add First Note',
						icon: <MdStickyNote2 />,
						color: accentColor,
						onClick: () => handleFormActivation(true)
					}}
				/>
			)}

			{(hasNotes || isFormActive) && (
				<AddNoteForm
					ref={inputRef}
					input={input}
					onChange={(v: string) => setInput(v)}
					onFocus={() => handleFormActivation(true)}
					onSubmit={isEditing ? handleEditNote : handleAddNote}
					isSendBtnVisible={isFormActive}
				/>
			)}

			{isFormActive && (
				<div
					className={styles.overlay}
					onClick={() => handleFormActivation(false)}
				/>
			)}
		</div>
	);
}

export { DiaryPage };