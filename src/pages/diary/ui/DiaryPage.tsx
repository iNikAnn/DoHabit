import styles from './DiaryPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { throttle } from 'es-toolkit';
import DiaryToolbar from './diary-toolbar/DiaryToolbar';
import { NoteForm } from '@widgets/note-form';
import { NoteList } from '@widgets/note-list';
import { type Note } from '@entities/note';
import { scrollToTop } from '@shared/lib/dom';

const SCROLL_CONTAINER_ID = 'modalChildrenWrapper';
const SCROLL_THRESHOLD = 600;
const SCROLLING_UP_ATTR = 'data-scrolling-up';

/**
 * Main diary page component.
 * Coordinates note creation, editing, and filtered feed display.
 */
function DiaryPage() {
	const location = useLocation();
	const [showScrollTop, setShowScrollTop] = useState(false);
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
	const handleNoteFormClose = (shouldClear = false) => {
		// Clear input on submit or when finishing edit mode
		if (shouldClear) {
			setNoteFormInput('');
		}

		// Reset edit state and hide form
		setEditingNoteId(undefined);
		setIsFormActive(false);
	};

	/**
	 * Tracks the scroll position to toggle the "Up" button,
	 * blocking re-triggers during smooth auto-scrolling.
	 */
	useEffect(() => {
		const el = document.getElementById(SCROLL_CONTAINER_ID);
		if (!el) return;

		const handleScrollTop = throttle(() => {
			if (el.getAttribute(SCROLLING_UP_ATTR) === 'true') {
				if (el.scrollTop < SCROLL_THRESHOLD) {
					el.removeAttribute(SCROLLING_UP_ATTR);
				}

				return;
			}

			setShowScrollTop(el.scrollTop > SCROLL_THRESHOLD);
		}, 400);

		el.addEventListener('scroll', handleScrollTop, { passive: true });

		return () => el.removeEventListener('scroll', handleScrollTop);
	}, []);


	/**
	 * Triggers smooth scrolling to the top of the container.
	 * Instantly hides the action button
	 * and sets a DOM flag to prevent scroll listener interference.
	 */
	const handleScrollToTop = () => {
		const el = document.getElementById(SCROLL_CONTAINER_ID);
		if (!el) return;

		el.setAttribute(SCROLLING_UP_ATTR, 'true');
		setShowScrollTop(false);
		scrollToTop(el);
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
				onChange={setNoteFormInput}
				onClose={handleNoteFormClose}
			/>

			<DiaryToolbar
				showToolbar={!isFormActive}
				showScrollTop={showScrollTop}
				onScrollTop={handleScrollToTop}
				onActivate={() => setIsFormActive(true)}
			/>
		</div>
	);
}

export { DiaryPage };