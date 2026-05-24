import { useEffect, useRef } from 'react';

/**
 * Handles closing UI components via system back gesture.
 * Syncs browser history with the component's open state.
 */
function useNativeBackClose(isOpen: boolean, onClose: () => void) {
	// Keep fresh callback reference to avoid effect reruns
	const onCloseRef = useRef(onClose);

	// Always sync ref with latest callback
	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) return;

		const handlePopState = () => {
			onCloseRef.current();
		};

		// Delay pushState to let pending history.back() finish first
		const timer = setTimeout(() => {
			window.history.pushState({ action: 'close-ui' }, '');
			window.addEventListener('popstate', handlePopState);
		}, 50);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('popstate', handlePopState);

			// If closed manually, remove entry from history
			if (window.history.state?.action === 'close-ui') {
				window.history.back();
			}
		};
	}, [isOpen]);
}

export { useNativeBackClose };