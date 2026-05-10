import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Note, useNotesStore } from '@entities/note';
import { DrawerAction, useDrawerStore } from '@shared/ui';

interface OpenMenuParams {
	note: Note;
	onEdit: (note: Note) => void;
}

/**
 * Hook to manage drawer menu logic.
 */
function useNoteActions() {
	const notesDispatch = useNotesStore((s) => s.notesDispatch);
	const openDrawer = useDrawerStore((s) => s.open);

	const getActions = (params: OpenMenuParams): DrawerAction[] => {
		const {
			note,
			onEdit
		} = params;

		return [
			// Delete note
			{
				icon: FaTrash,
				label: 'Delete Note',
				style: { color: 'IndianRed' },
				onClick: () => {
					if (window.confirm('Are you sure you want to delete this note?')) {
						notesDispatch({
							type: 'deleteNote',
							payload: {
								noteId: note.id
							}
						});
					}
				}
			},

			// Edit note
			{
				icon: FaPencilAlt,
				label: 'Edit Note',
				onClick: () => onEdit(note)
			}
		];
	}

	return {
		openNoteMenu: ({ note, ...rest }: OpenMenuParams) => {
			openDrawer({
				title: note.text,
				actions: getActions({ note, ...rest })
			});
		}
	};
}

export { useNoteActions };