import type { Note } from '@entities/note';
import { useDrawerStore, type DrawerAction } from '@shared/ui';
import { extractUniqueTags } from '@shared/lib/text';

interface OpenMenuParams {
	title: string,
	notes: Note[];
	activeTag: string | null;
	onSetTag: (tag: string) => void;
}

/**
 * Hook to open the note tags menu with dynamically calculated tags.
 */
function useNoteTags() {
	const openDrawer = useDrawerStore((s) => s.open);

	const getActions = (params: OpenMenuParams): DrawerAction[] => {
		const {
			notes,
			activeTag,
			onSetTag
		} = params;

		const tags = extractUniqueTags(notes, { order: 'asc' });

		return tags.map((tag) => ({
			label: tag,
			indicator: { type: tag === activeTag ? 'checkmark' : 'none' },
			onClick: () => onSetTag(tag)
		}));
	};

	return {
		openNoteTagsMenu: (params: OpenMenuParams) => {
			openDrawer({
				title: params.title,
				actions: getActions(params)
			})
		}
	};
}

export { useNoteTags };