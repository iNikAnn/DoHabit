import { VitePWA } from 'vite-plugin-pwa';
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import htmlPlugin from 'vite-plugin-html-config';
import pkg from './package.json';

const THEME_COLOR_DARK = '#000000';
const THEME_COLOR_LIGHT = '#ffffff';
const BACKGROUND_COLOR_DARK = '#000000'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/DoHabit/',

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		}
	},

	server: {
		open: true,
		host: true
	},

	build: {
		target: 'esnext'
	},

	plugins: [
		react(),
		svgr(),

		htmlPlugin({
			metas: [
				{
					name: 'description',
					content: pkg.description
				},
				{
					name: 'theme-color',
					content: THEME_COLOR_DARK
				},
				{
					name: 'theme-color',
					content: THEME_COLOR_LIGHT,
					media: '(prefers-color-scheme: light)'
				}
			]
		}),

		VitePWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: true,
				config: true,
			},

			manifest: {
				name: 'DoHabit',
				short_name: 'DoHabit',
				description: pkg.description,

				categories: [
					'fitness',
					'health',
					'lifestyle',
					'productivity',
					'utilities'
				],

				icons: [
					// 192
					{
						src: 'assets/brand/logo192-alpha.png',
						type: 'image/png',
						sizes: '192x192'
					},
					{
						src: 'assets/brand/logo192-maskable.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'maskable'
					},
					{
						src: 'assets/brand/logo192-monochrome.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'monochrome'
					},

					// 512
					{
						src: 'assets/brand/logo512-alpha.png',
						type: 'image/png',
						sizes: '512x512'
					},
					{
						src: 'assets/brand/logo512-maskable.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'maskable'
					},
					{
						src: 'assets/brand/logo512-monochrome.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'monochrome'
					}
				],

				start_url: '.',
				id: '/DoHabit/',
				display: 'standalone',
				orientation: 'portrait',
				lang: 'en',

				theme_color: THEME_COLOR_DARK,
				background_color: BACKGROUND_COLOR_DARK,
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		})],
});