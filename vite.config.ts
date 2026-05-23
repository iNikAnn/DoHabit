import { VitePWA } from 'vite-plugin-pwa';
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

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

	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'DoHabit',
				short_name: 'DoHabit',
				description: 'DoHabit is a straightforward habit tracker that doesn’t require registration. Easily mark your completed days, track your progress, and keep a journal for each habit.',

				categories: [
					'fitness',
					'health',
					'lifestyle',
					'productivity',
					'utilities'
				],

				icons: [
					// favicon
					{
						src: 'favicon.png',
						sizes: '64x64 32x32 24x24 16x16',
						type: 'image/png'
					},

					// with alpha
					{
						src: 'icons/logo192-alpha.png',
						type: 'image/png',
						sizes: '192x192'
					},
					{
						src: 'icons/logo512-alpha.png',
						type: 'image/png',
						sizes: '512x512'
					},

					// maskable
					{
						src: 'icons/logo192-maskable.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'maskable'
					},
					{
						src: 'icons/logo512-maskable.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'maskable'
					},

					// monochrome
					{
						src: 'icons/logo512-monochrome.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'monochrome'
					},
					{
						src: 'icons/logo512-maskable-monochrome.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'maskable monochrome'
					},
				],

				start_url: '.',
				id: '/DoHabit/',
				display: 'standalone',
				orientation: 'portrait',
				lang: 'en',

				theme_color: '#000000',
				background_color: '#000000',
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