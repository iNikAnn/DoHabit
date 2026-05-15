import './styles/App.css';
import { AppRouter } from './providers';
import useColorScheme from '../hooks/useColorScheme';
import { useCheckAchievements } from '@features/check-achievements';
import { Dialog, Drawer } from '@shared/ui';

function App() {
	useColorScheme();
	useCheckAchievements();

	return (
		<main className='App'>
			<AppRouter />
			<Dialog />
			<Drawer />
		</main>
	);
}

export { App };