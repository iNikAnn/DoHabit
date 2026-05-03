import './styles/App.css';

// stores
import { useDialogStore } from '../stores/dialogStore';

// main components
import Dialog from '../components/Containment/Dialog';

// hooks
import useColorScheme from '../hooks/useColorScheme';
import useAchievementsCheck from '../hooks/useAchievementsCheck';

import { AppRouter } from './providers';

function App() {

	const isDialogVisible = useDialogStore((s) => s.isVisible);

	// Get colors from database based on settings or system theme
	useColorScheme();

	// Check achievements when dependencies change
	useAchievementsCheck();

	return (
		<main className='App'>
			<AppRouter />

			{isDialogVisible && (
				<Dialog key='dialog' />
			)}
		</main>
	);
}

export { App };