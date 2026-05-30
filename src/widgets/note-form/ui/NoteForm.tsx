import styles from './NoteForm.module.css';
import { type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import TextareaAutosize from 'react-textarea-autosize';
import { IoSend } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import { useNotesStore } from '@entities/note';
import { useNativeBackClose } from '@shared/lib/dom';
import { Button, Overlay } from '@shared/ui';

interface Props {
	input: string;
	habitId?: string;
	streak?: number,
	editingNoteId?: string;
	isFormActive: boolean;
	onActivate: () => void;
	onChange: (v: string) => void;
	onClose: (shouldClear?: boolean) => void;
}

const isDev = import.meta.env.DEV;

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
	useNativeBackClose(isFormActive, () => onClose(Boolean(editingNoteId)));

	/**
	 * Handles note submission.
	 * Updates existing note if editingNoteId is present, otherwise creates a new one.
	 */
	const handleSubmitForm = (e?: React.SubmitEvent<HTMLFormElement>) => {
		e?.preventDefault();

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
						id: isDev ? String(Math.random()) : crypto.randomUUID(),
						habitId,
						streak: streak || undefined, // Avoid saving zero streaks
						text: input.trim(),
						createdAt: Date.now()
					}
				}
			});
		}

		// Close form, clear input, show toast
		onClose(true);
		toast.success(isEditMode ? 'Changes saved!' : 'Note created!');
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
						onClick={() => onClose(Boolean(editingNoteId))}
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
								value={input}
								placeholder='Enter your note here...'
								autoFocus
								autoComplete='off'
								onChange={(e) => onChange(e.target.value)}
								onKeyDown={handleKeyDown}
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
								disabled={!input.trim()}
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