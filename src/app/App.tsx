import './styles/App.css';

import { AppRouter } from './providers';
import { Dialog } from '@shared/ui';

// hooks
import useColorScheme from '../hooks/useColorScheme';
import useAchievementsCheck from '../hooks/useAchievementsCheck';

function App() {
	useColorScheme();
	useAchievementsCheck();

	return (
		<main className='App'>
			<AppRouter />
			<Dialog />
		</main>
	);
}

export { App };