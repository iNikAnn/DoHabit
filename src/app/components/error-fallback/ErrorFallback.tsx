import { clearLocalStorage, exportAppData } from '@shared/lib';
import { Placeholder } from '@shared/ui';

// @ts-ignore
const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';

/**
 * Error fallback for the whole app.
 * Provides options to reload or clear data.
 */
function ErrorFallback() {
	const handleReload = () => {
		window.location.href = PUBLIC_URL;
	};

	const handleBackupAndReset = () => {
		if (window.confirm('Backup your data and reset the app?')) {
			exportAppData();
			clearLocalStorage();
			handleReload();
		}
	};

	return (
		<Placeholder
			content={{
				title: 'Oops! Something went wrong',
				description: 'Try reloading. If it doesn’t help, reset the app data (your progress will be saved as a backup).'
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