import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useDialogStore } from '@shared/ui';

function PWABadge() {
	// periodic sync is disabled, change the value to enable it, the period is in milliseconds
	// You can remove onRegisteredSW callback and registerPeriodicSync function
	const period = 0;

	const { t } = useTranslation();
	const openDialog = useDialogStore((s) => s.open);

	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (period <= 0) return

			if (r?.active?.state === 'activated') {
				registerPeriodicSync(period, swUrl, r);
			} else if (r?.installing) {
				r.installing.addEventListener('statechange', (e) => {
					const sw = e.target as ServiceWorker

					if (sw.state === 'activated') {
						registerPeriodicSync(period, swUrl, r);
					}
				});
			}
		}
	});

	function handleClose() {
		setNeedRefresh(false);
	}

	if (needRefresh) {
		openDialog({
			title: t('app.update.title'),
			text: t('app.update.text'),
			actions: [
				{
					label: t('common.reload'),
					onClick: () => updateServiceWorker(true)
				},
				{
					label: t('common.close'),
					onClick: () => handleClose(),
					style: { backgroundColor: 'var(--bg-color-tertiary)' }
				}
			]
		});
	}

	return null;
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
	if (period <= 0) return;

	setInterval(async () => {
		if ('onLine' in navigator && !navigator.onLine) {
			return;
		}

		const resp = await fetch(swUrl, {
			cache: 'no-store',
			headers: {
				'cache': 'no-store',
				'cache-control': 'no-cache'
			}
		});

		if (resp?.status === 200) {
			await r.update();
		}
	}, period);
}