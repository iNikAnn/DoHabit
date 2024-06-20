import styles from '../../css/Diary.module.css';

// components
import NoteList from './NoteList';
import Placeholder from '../Placeholder';
import AddNoteForm from './AddNoteForm';

// db
import dbColors from '../../db/dbColors';

// icons
import { ReactComponent as InfoSvg } from '../../img/information.svg';
import { MdStickyNote2 } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';

function Diary(props) {
	const {
		habits, habitTitle,

		// 'on' functions
		onUpdate
	} = props;

	const habit = habits.find((habit) => habit.title === habitTitle);
	const hasNotes = habit.diary && habit.diary.length;
	const accentColor = dbColors[habit.colorIndex];

	// create new note
	const handleCreateNote = (text) => {
		const newNote = {
			text,
			date: new Date()
		};

		onUpdate({
			mode: 'createNote',
			habitTitle: habit.title,
			newNote
		});

		handleFormActivation(false);
	};

	// delete note
	const handleDeleteNote = (noteCreationDate) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			onUpdate({
				mode: 'deleteNote',
				habitTitle: habit.title,
				noteCreationDate
			});
		};
	};

	// form
	const [isFormActive, setIsFormActive] = useState(false);
	const formRef = useRef(null);

	const handleFormActivation = (boolean) => setIsFormActive(boolean);

	useEffect(
		() => { if (isFormActive) formRef.current.focus(); },
		[isFormActive]
	);

	useEffect(
		() => { if (!hasNotes) handleFormActivation(false); },
		[hasNotes]
	);

	return (
		<div style={{ paddingBottom: '3rem' }}>
			{hasNotes ? (
				<NoteList
					diary={habit.diary}
					onCreateNote={handleCreateNote}
					onDeleteNote={handleDeleteNote}
				/>
			) : (
				<Placeholder
					image={<InfoSvg />}
					title="This habit's diary is empty."
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
					onFocus={() => handleFormActivation(true)}
					onSubmit={handleCreateNote}
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