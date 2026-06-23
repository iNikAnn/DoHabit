import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import i18next from 'eslint-plugin-i18next';

export default defineConfig([
	globalIgnores([
		'dist',
		'public',
		'vite.config.ts',
		'eslint.config.ts',
		'pwa-assets.config.ts',
		'stylelint.config.ts'
	]),
	i18next.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: [
			'js/recommended',
			tseslint.configs.recommended,

			// TODO: Temporarily disabled eslint-plugin-react
			// due to peer dependency conflicts with ESLint 10.
			// Re-enable/update once the official package gets stable support.
			// pluginReact.configs.flat.recommended,

			reactHooks.configs.flat['recommended-latest'],
			reactRefresh.configs.vite
		],
		languageOptions: {
			globals: globals.browser
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',
			'i18next/no-literal-string': ['warn', {
				mode: 'all',
				'jsx-attributes': {
					include: [
						'placeholder'
					],
					exclude: [
						'className',
						'styleName',
						/.+Style$/,
						/.+ClassName$/,
						'style',
						'type',
						'key',
						'id',
						'width',
						'height',
						'variant',
						'type',
						'mode',
						'theme',
						'transition',
						'initial',
						'animate',
						'exit',
						'layout',
						'behavior',
						'action',
						'name',
						'autoComplete',
						'indicator',
						'drag',
						'color',
						'iconSize',
						'role',
						'layoutId',
						'position'
					]
				},
				'object-properties': {
					include: [],
					exclude: [
						'[A-Z_-]+',
						'className',
						'style',
						'action',
						'variant',
						'type',
						'color',
						'borderColor',
						'pointBackgroundColor',
						'backgroundColor',
						'transition',
						'ease',
						'path',
						'initial',
						'animate',
						'exit',
						'value',
						'target',
						'rel',
						'length',
						'baseColor',
						'darkenedColor',
						'softenedColor',
						'accentColor',
					],
				},
				words: {
					exclude: [
						'[0-9!-/:-@[-`{-~]+',
						'[A-Z_-]+',
						/^\p{Emoji}+$/u,
						/^mailto:.+/,
						'asc',
						'desc',
						'up',
						'down',
						'top',
						'bottom',
						'center',
						'middle',
						'decrement',
						'increment',
						'completed',
						'updated',
						'hidden',
						'auto',
						'forward',
						'backward',
						'true',
						'false',
					],
				},
				callees: {
					exclude: [
						'i18n(ext)?',
						't',
						'init',
						'require',
						'fetch',
						'addEventListener',
						'removeEventListener',
						'postMessage',
						'getElementById',
						'createElement',
						'dispatch',
						'commit',
						'includes',
						'indexOf',
						'endsWith',
						'startsWith',
						'onScrollTop',
						'notesDispatch',
						'settingsDispatch',
						'addColorStop',
						'Error',
						'canvas.toBlob',
						'toLocaleTimeString',
						'window.open',
						'matchMedia',
						'setProperty',
						'querySelector',
						'getContext',
						/^Intl\..+/,
						/^localStorage\..+/,
						/^console\..+/,
						/^indexedDB\..+/
					],
				},
			}]
		}
	}
]);
