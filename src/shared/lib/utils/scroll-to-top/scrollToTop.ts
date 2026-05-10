/**
 * Smoothly scrolls element or window to top.
 */
function scrollToTop(element?: Element | null) {
	const target = element ?? window;

	target.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

export { scrollToTop };