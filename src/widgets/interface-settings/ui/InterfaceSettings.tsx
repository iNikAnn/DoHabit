import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

function InterfaceSettings() {
	const { listItems } = useListItems();

	return (
		<List
			items={listItems}
		/>
	);
}

export { InterfaceSettings };