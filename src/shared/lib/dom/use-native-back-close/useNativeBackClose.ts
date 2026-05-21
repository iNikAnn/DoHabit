import { useEffect } from 'react';

/**
 * Handles closing UI components via system back gesture.
 * Syncs browser history with the component's open state.
 */
function useNativeBackClose(isOpen: boolean, onClose: () => void) {
	useEffect(() => {
		if (!isOpen) return;

		const handlePopState = () => {
			onClose();
		};

		// Add entry to history to catch the "back" move
		window.history.pushState({ action: 'close-ui' }, '');
		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);

			// If closed manually, remove entry from history
			if (window.history.state?.action === 'close-ui') {
				window.history.back();
			}
		};
	}, [isOpen, onClose]);
}

export { useNativeBackClose };