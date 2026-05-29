import './styles/App.css';
import { Toaster } from 'sonner'
import { AppRouter } from './providers';
import { useCheckAchievements } from '@features/check-achievements';
import { useTheme } from '@entities/settings';
import { Dialog, Drawer } from '@shared/ui';
import PWABadge from '@/PWABadge';

function App() {
	const theme = useTheme();
	useCheckAchievements();

	return (
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
	);
}

export { App };