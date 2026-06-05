import { MdAddToPhotos } from 'react-icons/md';
import { CalendarIcon, TableIcon } from '@shared/assets';
import { getNavigationTarget } from '@shared/lib/router';
import { Placeholder } from '@shared/ui';
import { useTranslation } from 'react-i18next';
import { startCase } from 'es-toolkit';

interface Props {
	isArchive: boolean;
}

function HabitListEmpty({ isArchive }: Props) {
	const { t } = useTranslation();

	return isArchive ? (
		<Placeholder
			content={{
				image: <TableIcon />,
				title: t('habits.emptyArchivedTitle'),
				description: t('habits.emptyArchivedDescription')
			}}
		/>
	) : (
		<Placeholder
			content={{
				image: <CalendarIcon />,
				title: t('habits.emptyActiveTitle'),
				description: t('habits.emptyActiveDescription')
			}}
			action={{
				label: startCase(t('habits.createFirst')),
				icon: <MdAddToPhotos />,
				...getNavigationTarget('HABIT_EDITOR', {
					modalTitle: t('habits.createNew')
				})
			}}
		/>
	);
}

export default HabitListEmpty;