import { useTranslation } from 'react-i18next';
import { exportAppData } from '@features/data-management/export-data';
import { clearLocalStorage } from '@shared/lib/local-storage';
import { Placeholder } from '@shared/ui';

/**
 * Error fallback for the whole app.
 * Provides options to reload or clear data.
 */
function ErrorFallback() {
	const { t } = useTranslation();

	const handleReload = () => {
		window.location.href = import.meta.env.BASE_URL;
	};

	const handleBackupAndReset = () => {
		if (window.confirm(t('error.resetConfirm'))) {
			exportAppData();
			clearLocalStorage();
			handleReload();
		}
	};

	return (
		<Placeholder
			content={{
				title: t('error.boundaryTitle'),
				description: t('error.boundaryDesc')
			}}
			action={[
				{
					label: 'Reload App',
					color: 'var(--bg-color-secondary)',
					onClick: handleReload
				},
				{
					label: 'Backup and Reset',
					color: 'IndianRed',
					onClick: handleBackupAndReset
				}
			]}
		/>
	);
}

export default ErrorFallback;