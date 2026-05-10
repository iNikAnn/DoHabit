import './styles/App.css';
import { AppRouter } from './providers';
import { Dialog, Drawer } from '@shared/ui';
import useColorScheme from '../hooks/useColorScheme';
import useAchievementsCheck from '../hooks/useAchievementsCheck';

function App() {
	useColorScheme();

	// TODO: Refactor and re-enable after fixing the achievements logic to support the new data structure
	// useAchievementsCheck();

	return (
		<main className='App'>
			<AppRouter />
			<Dialog />
			<Drawer />
		</main>
	);
}

export { App };