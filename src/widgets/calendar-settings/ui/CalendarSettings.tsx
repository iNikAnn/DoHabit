import { useTranslation } from 'react-i18next';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

/**
 * Widget for calendar settings.
 * Renders switches to toggle day names, numbers, etc.
 */
function CalendarSettings() {
	const { t } = useTranslation();
	const { listItems } = useListItems();

	return (
		<List
			title={t('menu.appearance.calendar.sectionTitle')}
			items={listItems}
		/>
	);
}

export { CalendarSettings };