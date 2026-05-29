import { useEffect, useRef } from 'react';

interface UseIntersectionObserverParams {
	onIntersect: () => void;
	enabled: boolean;
	options?: IntersectionObserverInit;
}

function useIntersectionObserver({
	onIntersect,
	enabled,
	options
}: UseIntersectionObserverParams) {
	const targetRef = useRef(null);

	useEffect(() => {
		if (!targetRef.current || !enabled) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				onIntersect();
			}
		}, options);

		observer.observe(targetRef.current);

		return () => observer.disconnect();
	}, [enabled, onIntersect, options]);

	return targetRef;
}

export { useIntersectionObserver };