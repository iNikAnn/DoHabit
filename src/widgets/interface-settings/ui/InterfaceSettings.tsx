import { useTranslation } from 'react-i18next';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

function InterfaceSettings() {
	const { t } = useTranslation();
	const { listItems } = useListItems();

	return (
		<List
			title={t('common.ui')}
			items={listItems}
		/>
	);
}

export { InterfaceSettings };