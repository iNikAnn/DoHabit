import styles from './MenuPage.module.css';
import { useTranslation } from 'react-i18next';
import { MdInstallMobile } from 'react-icons/md';
import useListItems from '../model/useListItems';
import pkg from '../../../../package.json';
import { usePwaInstall } from '@features/pwa-install';
import { List } from '@shared/ui';

const isTest = import.meta.env.VITE_TEST_BUILD === 'true';

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
						items={[{
							icon: <MdInstallMobile color='#2db78b' />,
							title: t('welcome.actions.install'),
							onClick: handleInstall
						}]}
					/>
				)}

				<small className={styles.version}>
					<span>{t('common.version')}</span>

					<span>: {pkg.version}</span>
					{isTest && <span> TEST</span>}
				</small>
			</div>
		</section>
	);
}

export { MenuPage };