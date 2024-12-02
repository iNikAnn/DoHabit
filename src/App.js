import './App.css';

// react
import React, { useReducer, useState } from 'react';

// router
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

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
import useColors from './hooks/useColors';
import useAchievementsCheck from './hooks/useAchievementsCheck';

// utils
import initHabits from './utils/initHabits';
import habitsReducer from './utils/habitsReducer';

// db
import dbIcons from './db/dbIcons';

const publicUrl = process.env.PUBLIC_URL;

function App() {

	const location = useLocation();
	const [dialog, setDialog] = useState(false);

	// Get colors from database based on settings or system theme
	const dbColors = useColors();

	const [habits, habitsDispatch] = useReducer(habitsReducer, null, initHabits);

	// Check achievements when dependencies change
	useAchievementsCheck(habits, setDialog);

	const modalComponents = [
		{
			path: 'habitEditor',
			element: (
				<HabitEditor
					{...{ habits, dbIcons, dbColors }}
					onUpdate={habitsDispatch}
				/>
			)
		},
		{
			path: 'menu',
			element: <Menu />
		},
		{
			path: 'diary',
			element: (
				<Diary
					{...{ habits, dbColors }}
					onUpdate={habitsDispatch}
				/>
			)
		},
		{
			path: 'archive',
			element: (
				<Archive
					{...{ habits, dbIcons, dbColors }}
					onUpdate={habitsDispatch}
				/>
			)
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
			element: (
				<Achievements
					onOpenDialog={setDialog}
				/>
			)
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
						element={
							<MainPage
								key="mainPage"
								{...{ habits, dbIcons, dbColors }}
								onUpdate={habitsDispatch}
							/>
						}
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

				{dialog && (
					<Dialog
						key="dialog"
						{...dialog}
						onClose={() => setDialog(false)}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}

export default App;