import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
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
				label: t('notes.actions.delete'),
				variant: 'danger',
				onClick: () => removeNote(
					note.id,
					() => toast.success(t('notes.notifications.deleteSuccess'))
				)
			},

			// Edit note
			{
				icon: FaPencilAlt,
				label: t('notes.actions.edit'),
				onClick: () => onEdit(note)
			},

			// Copy to clipboard
			{
				icon: FaCopy,
				label: t('notes.actions.copy'),
				onClick: async () => {
					const success = await copyToClipboard({ text: note.text });

					if (success) {
						toast.success(t('notes.notifications.copySuccess'));
					} else {
						toast.error(t('notes.notifications.copyError'));
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