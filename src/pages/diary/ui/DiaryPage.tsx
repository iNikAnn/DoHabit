import styles from './DiaryPage.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NoteForm } from '@widgets/note-form';
import { NoteList } from '@widgets/note-list';
import { Note } from '@entities/note';
import { scrollToTop } from '@shared/lib';

/**
 * Main diary page component.
 * Coordinates note creation, editing, and filtered feed display.
 */
function DiaryPage() {
	const location = useLocation();
	const [editingNoteId, setEditingNoteId] = useState<string>();
	const [isFormActive, setIsFormActive] = useState(false);
	const [noteFormInput, setNoteFormInput] = useState('');

	const { habitId, currentStreak } = location.state ?? {};

	/**
	 * Opens the form in edit mode and fills it with note data.
	 */
	const handleEditNote = (note: Note) => {
		setEditingNoteId(note.id);
		setNoteFormInput(note.text);
		setIsFormActive(true);
	};

	/**
	 * Handle closing the note form.
	 * Keeps text as draft if user just closed new note form.
	 */
	const handleNoteFormClose = (shouldClear = false, shouldScrollUp = false) => {
		// Clear input on submit or when finishing edit mode
		if (shouldClear || editingNoteId) {
			setNoteFormInput('');
		}

		// Scroll to top of the list
		if (shouldScrollUp) {
			scrollToTop(document.querySelector('#modalChildrenWrapper'));
		}

		// Reset edit state and hide form
		setEditingNoteId(undefined);
		setIsFormActive(false);
	};

	return (
		<div className={styles.diary}>
			<NoteList
				habitId={habitId}
				onEdit={handleEditNote}
			/>

			<NoteForm
				input={noteFormInput}
				habitId={habitId}
				streak={currentStreak}
				editingNoteId={editingNoteId}
				isFormActive={isFormActive}
				onActivate={() => setIsFormActive(true)}
				onChange={setNoteFormInput}
				onClose={handleNoteFormClose}
			/>
		</div>
	);
}

export { DiaryPage };