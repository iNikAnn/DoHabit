import styles from './MenuPage.module.css';
import { useTranslation } from 'react-i18next';
import packageJson from '../../../../package.json';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

/**
 * Navigation hub for app settings.
 */
function MenuPage() {
	const { t } = useTranslation();
	const { appItems, supportItems } = useListItems();

	return (
		<section className={styles.page}>
			<List
				title={t('common.app')}
				items={appItems}
			/>

			<List
				title={t('common.support')}
				items={supportItems}
			/>

			<div className={styles.footer}>
				<small>
					<span>
						{t('common.version')}
					</span>

					<span>: {packageJson.version}</span>
				</small>
			</div>
		</section>
	);
}

export { MenuPage };