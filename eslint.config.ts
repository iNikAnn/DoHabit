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
						'style',
						'type',
						'key',
						'id',
						'width',
						'height',
						'variant',
						'type',
						'mode',
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
						'color'
					]
				},
				'object-properties': {
					include: [],
					exclude: [
						'[A-Z_-]+',
						'variant',
						'type',
						'color',
						'pointBackgroundColor'
					],
				},
				words: {
					exclude: [
						'[0-9!-/:-@[-`{-~]+',
						'[A-Z_-]+',
						/^\p{Emoji}+$/u,
						'asc',
						'desc'
					],
				},
				callees: {
					exclude: [
						'i18n(ext)?',
						't',
						'require',
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
						'addColorStop'
					],
				},
			}]
		}
	}
]);
