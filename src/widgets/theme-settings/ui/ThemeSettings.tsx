import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

function ThemeSettings() {
	const { listItems } = useListItems();

	return (
		<List
			items={listItems}
		/>
	);
}

export { ThemeSettings };