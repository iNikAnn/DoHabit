import './App.css';

// react
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

// context
import { SettingsContext } from './context/settingsContext';

// router
import { Routes, Route, useLocation } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import Modal from './components/Modal';
import Dialog from './components/Containment/Dialog';
import HabitEditor from './components/HabitEditor/HabitEditor';
import Menu from './components/Menu/Menu';
import Diary from './components/Diary/Diary';
import Statistics from './components/Statistics/Statistics';
import Archive from './components/Archive/Archive';
import AppearanceSettings from './components/Appearance Settings/AppearanceSettings';
import DataTransfer from './components/DataTransfer/DataTransfer';
import Achievements from './components/Achievements/Achievements';

// utils
import getColors from './utils/getColors';
import initHabits from './utils/initHabits';
import habitsReducer from './utils/habitsReducer';
import initMainDiary from './utils/initMainDiary';
import mainDiaryReducer from './utils/mainDiaryReducer';
import initAchievements from './utils/initAchievements';
import achievementsReducer from './utils/achievementsReducer';

// db
import dbIcons from './db/dbIcons';
import MainPage from './components/MainPage';

const publicUrl = process.env.PUBLIC_URL;

function App() {
	// The value will be changed to false later in the code
	const isInitialRender = useRef(true);
	const settings = useContext(SettingsContext);
	const location = useLocation();
	const [dialog, setDialog] = useState(false);

	const dbColors = getColors(
		settings.isDarkSchemeForced
			? 'dark'
			: matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
	);

	// --- Habits:START ---
	const [habits, habitsDispatch] = useReducer(habitsReducer, null, initHabits);
	const handleUpdateHabits = (actions) => habitsDispatch(actions);
	// --- Habits:END ---

	// --- Main Diary:START ---
	const [mainDiary, mainDiaryDispatch] = useReducer(mainDiaryReducer, null, initMainDiary);
	const handleUpdateMainDiary = (actions) => mainDiaryDispatch(actions);
	// --- Main Diary:END ---

	// --- Achievements:START ---
	const [achievements, achievementsDispatch] = useReducer(achievementsReducer, null, initAchievements);

	useEffect(
		() => {
			achievementsDispatch({
				habits,
				mainDiary,
				onOpenDialog: setDialog,
				isInitialRender: isInitialRender.current
			});
		},
		[habits, mainDiary]
	);
	// --- Achievements:END ---

	// --- Modal:START ---
	const modalComponents = [
		{
			path: 'habitEditor',
			element: (
				<HabitEditor
					{...{ habits, dbIcons, dbColors }}
					onUpdate={handleUpdateHabits}
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
					{...{ habits, mainDiary, dbColors }}
					onUpdate={handleUpdateHabits}
					onUpdateMainDiary={handleUpdateMainDiary}
				/>
			)
		},
		{
			path: 'archive',
			element: (
				<Archive
					{...{ habits, dbIcons, dbColors }}
					onUpdate={handleUpdateHabits}
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
					{...{ achievements }}
					onOpenDialog={setDialog}
				/>
			)
		}
	];
	// --- Modal:END ---

	// End of initial render
	useEffect(() => { isInitialRender.current = false }, []);

	return (
		<main className="App">
			<AnimatePresence initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route
						path={publicUrl}
						element={
							<MainPage
								key="mainPage"
								{...{ habits, dbIcons, dbColors }}
								onUpdate={handleUpdateHabits}
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