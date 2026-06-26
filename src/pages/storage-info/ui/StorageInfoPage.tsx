import { Button, Card } from '@shared/ui';
import styles from './StorageInfoPage.module.css';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@entities/settings';

function StorageInfoPage() {
	const { t } = useTranslation();

	const settings = useSettingsStore((s) => s.settings);
	const settingsDispatch = useSettingsStore((s) => s.settingsDispatch);

	const handleConfirm = () => {
		settingsDispatch({
			type: 'updateSettings',
			payload: { hasSeenStorageInfo: true }
		})
	};

	return (
		<div className={styles.page}>
			<Card childrenClassName={styles.card}>
				<p className={styles.intro}>
					{t('storageInfo.intro')}
				</p>

				<div className={styles.privacy}>
					{t('storageInfo.privacy')}
				</div>

				<p className={styles.pwa}>
					{t('storageInfo.pwa')}
				</p>
			</Card>

			<Card childrenClassName={styles.card}>
				<div className={styles.warning}>
					{t('storageInfo.warning')}
				</div>

				<p className={styles.action}>
					{t('storageInfo.notice')}
				</p>
			</Card>

			{!settings.hasSeenStorageInfo && (
				<Button
					style={{ height: '56px' }}
					onClick={handleConfirm}
				>
					{t('storageInfo.actions.confirm')}
				</Button>
			)}
		</div>
	);
}

export { StorageInfoPage };