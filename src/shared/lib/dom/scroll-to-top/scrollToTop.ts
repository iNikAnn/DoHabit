interface ScrollToTopOptions {
	behavior?: 'auto' | 'instant' | 'smooth';
}

/**
 * Smoothly scrolls element or window to top.
 */
function scrollToTop(element?: Element | null, options?: ScrollToTopOptions) {
	const target = element ?? window;
	const { behavior = 'smooth' } = options ?? {};

	target.scrollTo({
		top: 0,
		behavior
	});
}

export { scrollToTop };