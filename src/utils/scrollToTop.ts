/**
 * Smoothly scrolls the window to the top of the page.
 */
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

export default scrollToTop;