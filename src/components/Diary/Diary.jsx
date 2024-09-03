import styles from '../../css/Diary.module.css';

// components
import NoteList from './NoteList';
import Placeholder from '../Placeholder';
import AddNoteForm from './AddNoteForm';

// icons
import { ReactComponent as InfoSvg } from '../../img/information.svg';
import { MdStickyNote2 } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';

function Diary(props) {
	const {
		habitTitle, diary, accentColor,

		// 'on' functions
		onUpdate, onUpdateMainDiary
	} = props;

	const hasNotes = diary && typeof diary === 'object' && diary.length;

	// create new note
	const handleAddNote = (text) => {
		const newNote = {
			text,
			date: new Date()
		};

		if (habitTitle) {
			onUpdate({
				type: 'addNote',
				habitTitle: habitTitle,
				newNote
			});
		} else {
			onUpdateMainDiary({
				type: 'addNote',
				newNote
			});
		};

		handleFormActivation(false);
	};

	// delete note
	const handleDeleteNote = (noteCreationDate) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			if (habitTitle) {
				onUpdate({
					type: 'deleteNote',
					habitTitle: habitTitle,
					noteCreationDate
				});
			} else {
				onUpdateMainDiary({
					type: 'deleteNote',
					noteCreationDate
				});
			};
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
					diary={diary}
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
					onFocus={() => handleFormActivation(true)}
					onSubmit={handleAddNote}
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