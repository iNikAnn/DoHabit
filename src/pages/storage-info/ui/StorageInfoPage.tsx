import styles from './StorageInfoPage.module.css';
import { useTranslation } from 'react-i18next';

function StorageInfoPage() {
	const { t } = useTranslation();

	return (
		<div className={styles.page}>
			<p className={styles.intro}>
				{t('storageInfo.intro')}
			</p>

			<div className={styles.privacy}>
				{t('storageInfo.privacy')}
			</div>

			<p className={styles.pwa}>
				{t('storageInfo.pwa')}
			</p>

			<div className={styles.warning}>
				{t('storageInfo.warning')}
			</div>

			<p className={styles.action}>
				{t('storageInfo.action')}
			</p>
		</div>
	);
}

export { StorageInfoPage };