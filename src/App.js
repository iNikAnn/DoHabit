import './App.css';

// router
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useDialog } from './stores/dialogStore';

// main components
import MainPage from './components/MainPage';
import Dialog from './components/Containment/Dialog';

// modal-related components
import Modal from './components/Modal';
import Achievements from './components/Achievements/Achievements';
import Archive from './components/Archive/Archive';
import AppearanceSettings from './components/Appearance Settings/AppearanceSettings';
import DataTransfer from './components/DataTransfer/DataTransfer';
import Diary from './components/Diary/Diary';
import HabitEditor from './components/HabitEditor/HabitEditor';
import Menu from './components/Menu/Menu';
import Statistics from './components/Statistics/Statistics';

// hooks
import useColorScheme from './hooks/useColorScheme';
import useAchievementsCheck from './hooks/useAchievementsCheck';

const publicUrl = process.env.PUBLIC_URL;

function App() {

	const location = useLocation();
	const isDialogVisible = useDialog((s) => s.isVisible);

	// Get colors from database based on settings or system theme
	useColorScheme();

	// Check achievements when dependencies change
	useAchievementsCheck();

	const modalComponents = [
		{
			path: 'habitEditor',
			element: <HabitEditor />
		},
		{
			path: 'menu',
			element: <Menu />
		},
		{
			path: 'diary',
			element: <Diary />
		},
		{
			path: 'archive',
			element: <Archive />
		},
		{
			path: 'dataTransfer',
			element: <DataTransfer />
		},
		{
			path: 'statistics',
			element: <Statistics />
		},
		{
			path: 'appearance',
			element: <AppearanceSettings />
		},
		{
			path: 'achievements',
			element: <Achievements />
		}
	];

	return (
		<main className="App">
			<AnimatePresence initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route
						path='*'
						element={<Navigate to={publicUrl} />}
					/>

					<Route
						path={publicUrl}
						element={<MainPage key="mainPage" />}
					/>

					<Route
						path={`${publicUrl}/modal`}
						element={<Modal key={location.pathname} />}
					>
						{modalComponents.map((r) => (
							<Route key={r.path} path={r.path} element={r.element} />
						))}
					</Route>
				</Routes>

				{isDialogVisible && (
					<Dialog key="dialog" />
				)}
			</AnimatePresence>
		</main>
	);
}

export default App;