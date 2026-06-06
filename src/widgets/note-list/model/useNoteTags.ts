import { useTranslation } from 'react-i18next';
import type { Note } from '@entities/note';
import { useDrawerStore, type DrawerAction } from '@shared/ui';
import { extractUniqueTags } from '@shared/lib/text';
import type { PlaceholderProps } from '@shared/ui/placeholder/types';

interface OpenMenuParams {
	title: string,
	notes: Note[];
	onSetTag: (tag: string) => void;
}

/**
 * Hook to open the note tags menu with dynamically calculated tags.
 */
function useNoteTags() {
	const { t } = useTranslation();
	const openDrawer = useDrawerStore((s) => s.open);

	const getActions = (params: OpenMenuParams): DrawerAction[] => {
		const {
			notes,
			onSetTag
		} = params;

		const tags = extractUniqueTags(notes, { order: 'asc' });

		return tags.map((tag) => ({
			label: tag,
			onClick: () => onSetTag(tag)
		}));
	};

	return {
		openNoteTagsMenu: (params: OpenMenuParams) => {
			const actions = getActions(params);

			const placeholder: PlaceholderProps = {
				content: {
					title: t('notes.tags.emptyTitle'),
					description: t('notes.tags.emptyDesc')
				}
			};

			openDrawer({
				title: params.title,
				actions,
				// Display empty state placeholder if no tags are available in the selected period
				placeholder: actions.length === 0 ? placeholder : undefined
			});
		}
	};
}

export { useNoteTags };