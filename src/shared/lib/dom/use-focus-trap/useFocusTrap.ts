import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
	'a[href]:not([tabindex="-1"]):not([disabled])',
	'area[href]:not([tabindex="-1"]):not([disabled])',
	'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
	'select:not([disabled]):not([tabindex="-1"])',
	'textarea:not([disabled]):not([tabindex="-1"])',
	'button:not([disabled]):not([tabindex="-1"])',
	'iframe:not([tabindex="-1"])',
	'[tabindex]:not([tabindex="-1"]):not([disabled])',
	'[contentEditable="true"]:not([tabindex="-1"])'
].join(', ');

const INERT_ATTR = 'INERT'.toLowerCase();

function isFocusable(el: HTMLElement): boolean {
	if (el.hidden) {
		return false;
	}
	if ('disabled' in el && Boolean((el as HTMLButtonElement).disabled)) {
		return false;
	}
	if (el.tabIndex < 0) {
		return false;
	}
	try {
		const style = window.getComputedStyle(el);
		if (style.display === 'none' || style.visibility === 'hidden') {
			return false;
		}
	} catch {
		// Fallback if getComputedStyle is unavailable
	}
	return true;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
	const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
	return elements.filter(isFocusable);
}

let activeTrapCount = 0;

function setRootInert(inert: boolean) {
	const rootEl = document.getElementById('root');
	if (!rootEl) return;

	if (inert) {
		rootEl.setAttribute(INERT_ATTR, '');
	} else {
		rootEl.removeAttribute(INERT_ATTR);
	}
}

interface UseFocusTrapOptions<T extends HTMLElement = HTMLElement> {
	isActive: boolean;
	containerRef?: RefObject<T | null>;
	initialFocusRef?: RefObject<HTMLElement | null>;
	restoreFocus?: boolean;
	inertBackground?: boolean;
}

/**
 * Traps keyboard focus within an active modal container.
 */
function useFocusTrap<T extends HTMLElement = HTMLElement>({
	isActive,
	containerRef: externalContainerRef,
	initialFocusRef,
	restoreFocus = true,
	inertBackground = true
}: UseFocusTrapOptions<T>) {
	const internalContainerRef = useRef<T | null>(null);
	const containerRef = externalContainerRef ?? internalContainerRef;
	const previousActiveElementRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isActive || !inertBackground) return;

		activeTrapCount++;
		if (activeTrapCount === 1) {
			setRootInert(true);
		}

		return () => {
			activeTrapCount = Math.max(0, activeTrapCount - 1);
			if (activeTrapCount === 0) {
				setRootInert(false);
			}
		};
	}, [isActive, inertBackground]);

	useEffect(() => {
		if (!isActive) return;

		previousActiveElementRef.current = (document.activeElement as HTMLElement) ?? null;

		const focusTimer = setTimeout(() => {
			const container = containerRef.current;
			if (!container) return;

			if (initialFocusRef?.current) {
				initialFocusRef.current.focus();
				return;
			}

			const focusable = getFocusableElements(container);
			if (focusable.length > 0) {
				focusable[0].focus();
			} else {
				container.focus();
			}
		}, 50);

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const container = containerRef.current;
			if (!container) return;

			const focusable = getFocusableElements(container);
			if (focusable.length === 0) {
				e.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			if (e.shiftKey) {
				if (active === first || !container.contains(active)) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (active === last || !container.contains(active)) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown, true);

		return () => {
			clearTimeout(focusTimer);
			document.removeEventListener('keydown', handleKeyDown, true);

			if (restoreFocus && previousActiveElementRef.current) {
				previousActiveElementRef.current.focus();
			}
		};
	}, [isActive, containerRef, initialFocusRef, restoreFocus]);

	return containerRef;
}

export { useFocusTrap, type UseFocusTrapOptions };
