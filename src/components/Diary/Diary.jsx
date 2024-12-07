import styles from '../../css/Diary.module.css';

// react
import { useEffect, useRef, useState } from 'react';

// router
import { useLocation } from 'react-router-dom';

// stores
import { useColorsStore } from '../../stores/colorsStore';
import { useHabitsStore } from '../../stores/habitsStore';
import { useMainDiaryStore } from '../../stores/mainDiaryStore';

// components
import NoteList from './NoteList';
import Placeholder from '../Placeholder';
import AddNoteForm from './AddNoteForm';

// icons
import { ReactComponent as InfoSvg } from '../../img/information.svg';
import { MdStickyNote2 } from 'react-icons/md';

function Diary() {

	const location = useLocation();

	const dbColors = useColorsStore((s) => s.colors);

	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const mainDiary = useMainDiaryStore((s) => s.mainDiary);
	const mainDiaryDispatch = useMainDiaryStore((s) => s.mainDiaryDispatch);

	const [habitTitle] = useState(location.state?.habitTitle);
	const [accentColor] = useState(dbColors[location.state?.colorIndex]);

	const currentStreak = location.state?.currentStreak ?? 0;

	const diary = habitTitle
		? habits.find((h) => h.title === habitTitle)?.diary
		: mainDiary;

	const hasNotes = diary && typeof diary === 'object' && diary.length;

	// create new note
	const handleAddNote = (text) => {
		const newNote = {
			text,
			date: new Date(),
			streak: currentStreak || undefined
		};

		const actions = {
			type: 'addNote',
			habitTitle: habitTitle,
			newNote
		};

		if (habitTitle) {
			habitsDispatch(actions);
		} else {
			mainDiaryDispatch(actions);
		};

		document.body
			.querySelector('#modalChildrenWrapper')
			.scrollTo({
				top: 0,
				behavior: 'smooth'
			});

		handleFormActivation(false);
	};

	// edit note
	const handleStartEdit = (noteCreationDate, text) => {
		setIsEditing(noteCreationDate);
		setInput(text);
		formRef.current.focus();
	};

	const handleEditNote = (newText) => {
		const actions = {
			type: 'editNote',
			habitTitle: habitTitle,
			noteCreationDate: isEditing,
			newText
		};

		if (habitTitle) {
			habitsDispatch(actions);
		} else {
			mainDiaryDispatch(actions);
		};

		setIsEditing(false);
		handleFormActivation(false);
	};

	// delete note
	const handleDeleteNote = (noteCreationDate) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			const actions = {
				type: 'deleteNote',
				habitTitle: habitTitle,
				noteCreationDate
			};

			if (habitTitle) {
				habitsDispatch(actions);
			} else {
				mainDiaryDispatch(actions);
			};
		};
	};

	// form
	const [input, setInput] = useState('');
	const [isFormActive, setIsFormActive] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef(null);

	const handleFormActivation = (boolean) => setIsFormActive(boolean);

	useEffect(
		() => { if (isFormActive) formRef.current.focus(); },
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
					image={<InfoSvg />}
					title={(habitTitle ? "This habit's" : 'Main') + ' diary is empty'}
					desc="Add your first note to start tracking your progress and thoughts."
					textOnButton="Add First Note"
					buttonIcon={<MdStickyNote2 />}
					onClick={() => handleFormActivation(true)}
					{...{ accentColor }}
				/>
			)}

			{(hasNotes || isFormActive) && (
				<AddNoteForm
					ref={formRef}
					input={input}
					setInput={setInput}
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

export default Diary;