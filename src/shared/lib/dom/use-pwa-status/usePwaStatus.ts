import { useMemo } from 'react';

/**
 * Handle PWA capability detection based on current environment.
 */
function usePwaStatus(deferredPrompt: any) {
	return useMemo(() => {
		if (typeof window === 'undefined') return 'BROWSER_ONLY';

		const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
		if (isStandalone) {
			return 'INSTALLED';
		}

		if (deferredPrompt) {
			return 'CAN_INSTALL';
		}

		const ua = navigator.userAgent;
		const isIOS = /iPad|iPhone|iPod/.test(ua);
		if (isIOS) {
			return 'IOS_MANUAL';
		}

		return 'BROWSER_ONLY';
	}, [deferredPrompt]);
}

export { usePwaStatus };