import { toast } from 'sonner';
import { FaCopy, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { removeNote } from '@features/remove-note';
import { type Note } from '@entities/note';
import { copyToClipboard } from '@shared/lib/dom';
import { type DrawerAction, useDrawerStore } from '@shared/ui';

interface OpenMenuParams {
	note: Note;
	onEdit: (note: Note) => void;
}

/**
 * Hook to manage drawer menu logic.
 */
function useNoteActions() {
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
				variant: 'danger',
				onClick: () => removeNote(
					note.id,
					() => toast.success('Note deleted!')
				)
			},

			// Edit note
			{
				icon: FaPencilAlt,
				label: 'Edit Note',
				onClick: () => onEdit(note)
			},

			// Copy to clipboard
			{
				icon: FaCopy,
				label: 'Copy Text',
				onClick: async () => {
					const success = await copyToClipboard({ text: note.text });

					if (success) {
						toast.success('Copied!');
					} else {
						toast.error('Copy failed.');
					}
				}
			}
		];
	};

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