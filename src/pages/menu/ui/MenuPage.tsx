import styles from './MenuPage.module.css';
import { useTranslation } from 'react-i18next';
import { MdInstallMobile } from 'react-icons/md';
import useListItems from '../model/useListItems';
import packageJson from '../../../../package.json';
import { usePwaInstall } from '@features/pwa-install';
import { List } from '@shared/ui';

/**
 * Navigation hub for app settings.
 */
function MenuPage() {
	const { t } = useTranslation();
	const { habitItems, settingsItems, supportItems } = useListItems();
	const { status, handleInstall } = usePwaInstall();

	return (
		<section className={styles.page}>
			<List
				title={t('common.habits')}
				items={habitItems}
			/>

			<List
				title={t('common.settings')}
				items={settingsItems}
			/>

			<List
				title={t('common.support')}
				items={supportItems}
			/>

			<div className={styles.footer}>
				{status !== 'INSTALLED' && (
					<List
						title='PWA'
						titleStyle={{ color: '#2db78b' }}
						listStyle={{ border: '2px solid #2db78b' }}
						items={[{
							icon: <MdInstallMobile color='#2db78b' />,
							title: t('welcome.actions.install'),
							onClick: handleInstall
						}]}
					/>
				)}

				<small className={styles.version}>
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