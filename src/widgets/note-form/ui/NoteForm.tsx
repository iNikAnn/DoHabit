import styles from './NoteForm.module.css';
import { type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import TextareaAutosize from 'react-textarea-autosize';
import { IoSend } from "react-icons/io5";
import { useNoteFormStore } from '@features/manage-note';
import { useNotesStore } from '@entities/note';
import { useNativeBackClose } from '@shared/lib/dom';
import { Button, Overlay } from '@shared/ui';

interface Props {
	habitId?: string;
	streak?: number,
}

const isDev = import.meta.env.DEV;

/**
 * Note creation and editing form.
 */
function NoteForm(props: Props) {
	const {
		habitId,
		streak
	} = props;

	// UI localization
	const { t } = useTranslation();

	// Form state and user input data
	const isOpen = useNoteFormStore((s) => s.isOpen);
	const draftText = useNoteFormStore((s) => s.draftText);
	const editingNoteId = useNoteFormStore((s) => s.editingNoteId);
	const isEditMode = !!editingNoteId;

	// Actions and internal event handlers
	const setDraftText = useNoteFormStore((s) => s.setDraftText);
	const notesDispatch = useNotesStore((s) => s.notesDispatch);
	const closeForm = useNoteFormStore((s) => s.closeForm);

	useNativeBackClose(isOpen, () => closeForm(isEditMode));

	/**
	 * Handles note submission.
	 * Updates existing note if editingNoteId is present, otherwise creates a new one.
	 */
	const handleSubmitForm = (e?: React.SubmitEvent<HTMLFormElement>) => {
		e?.preventDefault();

		if (isEditMode) {
			notesDispatch({
				type: 'editNote',
				payload: {
					noteId: editingNoteId,
					newText: draftText.trim()
				}
			});
		} else {
			notesDispatch({
				type: 'addNote',
				payload: {
					note: {
						id: isDev ? String(Math.random()) : crypto.randomUUID(),
						habitId,
						streak: streak || undefined, // Avoid saving zero streaks
						text: draftText.trim(),
						createdAt: Date.now()
					}
				}
			});
		}

		// Close form, clear input, show toast
		closeForm(true);

		toast.success(
			isEditMode
				? t('notes.notifications.editSuccess')
				: t('notes.notifications.createSuccess')
		);
	};

	/**
	 * Handles key combinations for form submission.
	 */
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			handleSubmitForm();
		}
	};

	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<>
					<Overlay
						key='note-form-dialog'
						onClick={() => closeForm(isEditMode)}
					/>

					{createPortal(
						<motion.form
							key='note-form'

							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}

							className={styles.form}
							action='submit'
							onSubmit={handleSubmitForm}
						>
							<TextareaAutosize
								name='note-input'
								id='note-input'
								minRows={1}
								maxRows={10}
								value={draftText}
								placeholder={t('notes.form.textPlaceholder')}
								autoFocus
								autoComplete='off'
								onChange={(e) => setDraftText(e.target.value)}
								onKeyDown={handleKeyDown}

								// Moves cursor to the end of text
								onFocus={(e) => {
									const length = draftText.length;
									e.currentTarget.setSelectionRange(length, length);
								}}
							/>

							<Button
								key='submit-note-form-button'
								type='submit'
								icon={<IoSend />}

								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								transition={{ duration: 0.2 }}

								className={styles.actionButton}
								disabled={!draftText.trim()}
							/>
						</motion.form>,
						document.body
					)}
				</>
			)}
		</AnimatePresence>
	);
}

export { NoteForm };