import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
	globalIgnores(['dist']),
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
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
]);
