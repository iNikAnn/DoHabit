import { List } from '@shared/ui';
import useListItems from '../model/useListItems';

/**
 * Widget for calendar settings.
 * Renders switches to toggle day names, numbers, etc.
 */
function CalendarSettings() {
	const { listItems } = useListItems();

	return (
		<List
			title='Calendar'
			items={listItems}
		/>
	);
}

export { CalendarSettings };