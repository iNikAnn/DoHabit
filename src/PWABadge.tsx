import { Button } from '@shared/ui';
import './PWABadge.css';

import { useRegisterSW } from 'virtual:pwa-register/react';

function PWABadge() {
	// periodic sync is disabled, change the value to enable it, the period is in milliseconds
	// You can remove onRegisteredSW callback and registerPeriodicSync function
	const period = 0;

	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (period <= 0) return
			if (r?.active?.state === 'activated') {
				registerPeriodicSync(period, swUrl, r)
			}
			else if (r?.installing) {
				r.installing.addEventListener('statechange', (e) => {
					const sw = e.target as ServiceWorker
					if (sw.state === 'activated')
						registerPeriodicSync(period, swUrl, r)
				})
			}
		},
	});

	function close() {
		setNeedRefresh(false);
	}

	return (
		<div className='PWABadge' role='alert' aria-labelledby='toast-message'>
			{needRefresh && (
				<div className='PWABadge-toast'>
					<div className='PWABadge-message'>
						<h3>
							Update Ready!
						</h3>

						<span id='toast-message'>
							Please click the reload button to sync the latest features.
						</span>
					</div>

					<div className='PWABadge-buttons'>
						<Button
							className='PWABadge-toast-button'
							onClick={() => updateServiceWorker(true)}
						>
							Reload
						</Button>

						<Button
							className='PWABadge-toast-button'
							onClick={() => close()}
						>
							Close
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
	if (period <= 0) return;

	setInterval(async () => {
		if ('onLine' in navigator && !navigator.onLine)
			return;

		const resp = await fetch(swUrl, {
			cache: 'no-store',
			headers: {
				'cache': 'no-store',
				'cache-control': 'no-cache',
			},
		});

		if (resp?.status === 200)
			await r.update();
	}, period);
}
