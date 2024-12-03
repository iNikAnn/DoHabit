import './App.css';

// router
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useDialogStore } from './stores/dialogStore';

// main components
import MainPage from './components/MainPage';
import Modal from './components/Modal';
import Dialog from './components/Containment/Dialog';

// hooks
import useColorScheme from './hooks/useColorScheme';
import useAchievementsCheck from './hooks/useAchievementsCheck';

// db
import dbModalRoutes from './db/dbModalRoutes';

const PUBLIC_URL = process.env.PUBLIC_URL;

function App() {

	const location = useLocation();
	const isDialogVisible = useDialogStore((s) => s.isVisible);

	// Get colors from database based on settings or system theme
	useColorScheme();

	// Check achievements when dependencies change
	useAchievementsCheck();

	return (
		<main className="App">
			<AnimatePresence initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route
						path='*'
						element={<Navigate to={PUBLIC_URL} />}
					/>

					<Route
						path={PUBLIC_URL}
						element={<MainPage />}
					/>

					<Route
						path={`${PUBLIC_URL}/modal`}
						element={<Modal />}
					>
						{dbModalRoutes.map((r) => (
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