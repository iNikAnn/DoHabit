import { useEffect, useState } from 'react';

/**
 * Checks system reduced motion state.
 */
function useSystemMotion(): boolean {
	const [isReduced, setIsReduced] = useState(() => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);

		media.addEventListener('change', handler);
		return () => media.removeEventListener('change', handler);
	}, []);

	return isReduced;
}

export { useSystemMotion };