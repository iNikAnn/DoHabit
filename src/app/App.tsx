import './styles/App.css';
import { AppRouter } from './providers';
import { useCheckAchievements } from '@features/check-achievements';
import { useTheme } from '@entities/settings';
import { Dialog, Drawer } from '@shared/ui';
import PWABadge from '@/PWABadge';

function App() {
	useTheme();
	useCheckAchievements();

	return (
		<main className='App'>
			<AppRouter />
			<Dialog />
			<Drawer />
			<PWABadge />
		</main>
	);
}

export { App };