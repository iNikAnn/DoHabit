import './styles/App.css';

import { AppRouter } from './providers';
import { Dialog } from '@shared/ui';

// hooks
import useColorScheme from '../hooks/useColorScheme';
import useAchievementsCheck from '../hooks/useAchievementsCheck';

function App() {
	// Get colors from database based on settings or system theme
	useColorScheme();

	// Check achievements when dependencies change
	useAchievementsCheck();

	return (
		<main className='App'>
			<AppRouter />
			<Dialog />
		</main>
	);
}

export { App };