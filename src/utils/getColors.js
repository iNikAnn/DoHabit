/**
 * Generates an array of colors based on the specified color scheme.
 *
 * @param {string} scheme - The color scheme to use. Should be either 'dark' or 'light'.
 * @returns {string[]} - An array of color strings in HSL format.
 * @throws {Error} - If the scheme is not 'dark' or 'light'.
 */

function getColors(scheme) {
	if (scheme !== 'dark' && scheme !== 'light') {
		throw new Error("Invalid scheme. Must be 'dark' or 'light'.");
	};

	const colors = [];
	const colorsCount = 21;

	for (let i = 0; i < colorsCount; i++) {
		if (scheme === 'dark') {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 40%, 50%)`);
		} else {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 85%, 70%)`);
		};
	};

	return colors;
}
export default getColors;