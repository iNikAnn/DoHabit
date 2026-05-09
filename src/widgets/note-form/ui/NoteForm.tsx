import styles from './NoteForm.module.css';
import { SubmitEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoSend } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import { useNotesStore } from '@entities/note';
import { Button, Overlay } from '@shared/ui';

interface Props {
	input: string;
	habitId?: string;
	streak?: number,
	editingNoteId?: string;
	isFormActive: boolean;
	onActivate: () => void;
	onChange: (v: string) => void;
	onClose: (shouldClear?: boolean, shouldScrollUp?: boolean) => void;
}

/**
 * Note creation and editing form.
 */
function NoteForm(props: Props) {
	const {
		input,
		habitId,
		streak,
		editingNoteId,
		isFormActive,
		onActivate,
		onChange,
		onClose
	} = props;

	const notesDispatch = useNotesStore((s) => s.notesDispatch);

	/**
	 * Handles note submission.
	 * Updates existing note if editingNoteId is present, otherwise creates a new one.
	 */
	const handleSubmitForm: SubmitEventHandler = (e) => {
		e.preventDefault();

		const isEditMode = !!editingNoteId;

		if (isEditMode) {
			notesDispatch({
				type: 'editNote',
				payload: {
					noteId: editingNoteId,
					newText: input.trim()
				}
			});
		} else {
			notesDispatch({
				type: 'addNote',
				payload: {
					note: {
						id: crypto.randomUUID(),
						habitId,
						streak,
						text: input.trim(),
						createdAt: Date.now()
					}
				}
			});
		}

		// Close form, clear input, and scroll up if it was a new note
		onClose(true, !isEditMode);
	};

	return (
		// @ts-ignore
		<AnimatePresence initial={false}>
			{!isFormActive && (
				<Button
					key='activate-note-form-button'

					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					transition={{ duration: 0.2 }}

					className={styles.actionButton}
					onClick={onActivate}
				>
					<FaPlus />
				</Button>
			)}

			{isFormActive && (
				<>
					<Overlay
						key='note-form-dialog'
						// Calling via arrow function to avoid passing Event object
						onClick={() => onClose()}
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
							<input
								type='text'
								name='input'
								id='input'
								value={input}
								onChange={(e) => onChange(e.target.value)}
								placeholder='Enter your note here...'
								autoFocus
							/>

							<Button
								key='submit-note-form-button'
								type='submit'
								icon={<IoSend />}

								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 0.8 }}
								exit={{ opacity: 0, scale: 0 }}
								transition={{ duration: 0.2 }}

								className={styles.actionButton}
								disabled={!input.length}
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