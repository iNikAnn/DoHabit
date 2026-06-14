import { useTranslation } from 'react-i18next';
import { usePwaStatus } from '@shared/lib/dom';
import { useDialogStore } from '@shared/ui';
import { usePwaStore } from './store';

function usePwaInstall() {
	// UI localization
	const { t } = useTranslation();

	// PWA installation state
	const deferredPrompt = usePwaStore((s) => s.deferredPrompt);
	const status = usePwaStatus(deferredPrompt);

	// Global stores
	const openDialog = useDialogStore((s) => s.open);

	/**
	 * Process PWA installation flow or trigger platform-specific instructions.
	 */
	const handleInstall = async (): Promise<void> => {
		if (status === 'INSTALLED') return;

		if (status === 'IOS_MANUAL') {
			openDialog({
				title: t('welcome.pwa.ios.title'),
				text: t('welcome.pwa.ios.steps')
			});
			return;
		}

		if (status === 'BROWSER_ONLY') {
			openDialog({
				title: t('welcome.pwa.chromeNudge.title'),
				text: t('welcome.pwa.chromeNudge.text')
			});
			return;
		}

		if (status === 'CAN_INSTALL' && deferredPrompt) {
			await deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;

			if (outcome === 'accepted') {
				usePwaStore.getState().setDeferredPrompt(null);
			}
		}
	};

	return {
		status,
		handleInstall
	};
}

export { usePwaInstall };