/** @type {import("stylelint").Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order'
	],
	plugins: [
		'stylelint-order'
	],
	rules: {
		'selector-class-pattern': null
	}
};