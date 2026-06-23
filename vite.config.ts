import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import htmlPlugin from 'vite-plugin-html-config';
import pkg from './package.json';

const APP_NAME = 'DoHabit';
const THEME_COLOR_DARK = '#000000';
const THEME_COLOR_LIGHT = '#ffffff';
const BACKGROUND_COLOR_DARK = '#000000';
const APP_TITLE = `${APP_NAME} | Build Habits, Break Limits & Crush Your Goals`;
const OG_BANNER_URL = '/assets/img/Repo-Card-Template.jpg';

const PRODUCTION_URL = 'https://dohabit.app/';
const IS_TEST_BUILD = process.env.VITE_TEST_BUILD === 'true';

const HOMEPAGE = IS_TEST_BUILD
	? pkg.homepage
	: PRODUCTION_URL;

const APP_URL = new URL(HOMEPAGE);
const APP_BASE = APP_URL.pathname;
const APP_DOMAIN = APP_URL.hostname;

// https://vitejs.dev/config/
export default defineConfig({
	base: APP_BASE,

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

		htmlPlugin({
			title: APP_TITLE,

			links: [
				{
					rel: 'canonical',
					href: PRODUCTION_URL
				}
			],

			metas: [
				// general
				{
					name: 'description',
					content: pkg.description
				},

				// theme
				{
					name: 'theme-color',
					content: THEME_COLOR_DARK
				},
				{
					name: 'theme-color',
					content: THEME_COLOR_LIGHT,
					media: '(prefers-color-scheme: light)'
				},

				// OG
				{
					property: 'og:url',
					content: HOMEPAGE
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					property: 'og:site_name',
					content: APP_NAME
				},
				{
					property: 'og:title',
					content: APP_TITLE
				},
				{
					property: 'og:description',
					content: pkg.description
				},
				{
					property: 'og:image',
					content: OG_BANNER_URL
				},

				{
					name: 'twitter:card',
					content: 'summary_large_image'
				},
				{
					property: 'twitter:domain',
					content: APP_DOMAIN
				},
				{
					property: 'twitter:url',
					content: HOMEPAGE
				},
				{
					name: 'twitter:title',
					content: APP_TITLE
				},
				{
					name: 'twitter:description',
					content: pkg.description
				},
				{
					name: 'twitter:image',
					content: OG_BANNER_URL
				}
			],

			headScripts: [
				// Structured Data
				// https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
				{
					type: 'application/ld+json',
					content: JSON.stringify([
						{
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							'name': APP_NAME,
							'url': PRODUCTION_URL
						},
						{
							'@context': 'https://schema.org',
							'@type': 'WebApplication',
							'name': APP_NAME,
							'operatingSystem': 'Windows, macOS, Android, iOS, Linux',
							'applicationCategory': 'LifestyleApplication',
							'offers': {
								'@type': 'Offer',
								'price': '0',
								'priceCurrency': 'USD'
							}
						}
					])
				}
			],
		}),

		VitePWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: true,
				config: true,
			},

			includeManifestIcons: false,

			manifest: {
				name: APP_NAME,
				short_name: APP_NAME,
				description: pkg.description,
				prefer_related_applications: false,

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

				shortcuts: [
					{
						name: 'Open notes',
						short_name: 'Notes',
						description: 'Capture ideas, moods, and reflections in your personal daily diary.',
						url: 'modal/diary'
					}
				],

				launch_handler: {
					client_mode: 'focus-existing'
				},

				start_url: '.',
				id: APP_BASE,
				display: 'standalone',
				display_override: ['standalone', 'minimal-ui', 'browser'],
				orientation: 'portrait',
				lang: 'en',
				dir: 'ltr',

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