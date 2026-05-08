import styles from './NoteForm.module.css';
import { SubmitEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
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

	const handleSubmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const isEditMode = editingNoteId;

		if (editingNoteId) {
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

		onClose(true, !isEditMode);
	};

	return (
		// @ts-ignore
		<AnimatePresence>
			{!isFormActive && (
				<Button
					key='activate-note-form-button'
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
						<form
							key='note-form'
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
								type='submit'
								icon={<IoSend />}
								className={styles.actionButton}
								disabled={!input.length}
							/>
						</form>,
						document.body
					)}
				</>
			)}
		</AnimatePresence>
	);
}

export { NoteForm };