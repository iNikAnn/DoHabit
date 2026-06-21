import './styles/App.css';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner'
import { AppRouter } from './providers';
import PWABadge from '../PWABadge';
import { useCheckAchievements } from '@features/check-achievements';
import { useSettingsStore, useTheme } from '@entities/settings';
import { useSystemMotion } from '@shared/lib/react';
import { Dialog, Drawer } from '@shared/ui';

function App() {
	const settings = useSettingsStore((s) => s.settings);
	const hasReducedMotion = useSystemMotion();
	const theme = useTheme();
	useCheckAchievements();

	return (
		<MotionConfig skipAnimations={!settings.isAnimationsEnabled || hasReducedMotion}>
			<main className='App'>
				<AppRouter />
				<Dialog />
				<Drawer />

				<Toaster
					position='top-center'
					theme={theme ?? 'system'}
					richColors
					toastOptions={{ className: 'toast' }}
				/>

				<PWABadge />
			</main>
		</MotionConfig>
	);
}

export { App };