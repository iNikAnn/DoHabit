import './App.css';

// react
import React, { useContext, useEffect, useReducer } from 'react';

// context
import { SettingsContext } from './context/settingsContext';

// router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import Modal from './components/Modal';
import HabitEditor from './components/HabitEditor/HabitEditor';
import Menu from './components/Menu/Menu';
import Diary from './components/Diary/Diary';
import Statistics from './components/Statistics/Statistics';
import Archive from './components/Archive/Archive';
import AppearanceSettings from './components/Appearance Settings/AppearanceSettings';
import DataTransfer from './components/DataTransfer/DataTransfer';

// utils
import getColors from './utils/getColors';
import initHabits from './utils/initHabits';
import initMainDiary from './utils/initMainDiary';
import habitsReducer from './utils/habitsReducer';
import mainDiaryReducer from './utils/mainDiaryReducer';
import modalReducer from './utils/modalReducer';
import exportHabits from './utils/exportHabits';
import importHabits from './utils/importHabits';

// db
import dbIcons from './db/dbIcons';
import MainPage from './components/MainPage';

function App() {
	const publicUrl = process.env.PUBLIC_URL;

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(
		() => {
			const handleGoBack = () => {
				handleUpdateModal({ type: 'close' });
			};

			window.addEventListener('popstate', handleGoBack);

			return () => window.removeEventListener('popstate', handleGoBack);
		},
		[]
	);

	const settings = useContext(SettingsContext);

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

	// --- Data Transfer:START ---
	const handleExportHabits = () => exportHabits(habits);
	const handleImportHabits = () => importHabits(handleUpdateHabits, publicUrl);
	// --- Data Transfer:END ---

	// --- Modal:START ---
	const [modal, modalDispatch] = useReducer(modalReducer, null);
	const handleUpdateModal = (actions) => modalDispatch(actions);

	const modalComponents = [
		<Route
			key="habitEditor"
			path="habitEditor"
			element={
				<HabitEditor
					{...{ habits, dbIcons, dbColors }}
					habitTitle={modal?.habitTitle}
					onUpdate={handleUpdateHabits}
					onClose={() => {
						// handleUpdateModal({ type: 'close' });
						navigate(-1);
					}}
				/>
			}
		/>,
		<Route
			key="menu"
			path="menu"
			element={
				<Menu onOpenModal={handleUpdateModal} />
			}
		/>,
		<Route
			key="diary"
			path="diary"
			element={
				<Diary
					habitTitle={modal?.habitTitle}
					accentColor={dbColors[modal?.colorIndex]}
					diary={
						modal?.habitTitle
							? habits.find((h) => h.title === modal?.habitTitle)?.diary
							: mainDiary
					}
					onUpdate={handleUpdateHabits}
					onUpdateMainDiary={handleUpdateMainDiary}
				/>
			}
		/>,
		<Route
			key="archive"
			path='archive'
			element={
				<Archive
					{...{ habits, dbIcons, dbColors }}
					onUpdate={handleUpdateHabits}
				/>
			}
		/>,
		<Route
			key="dataTransfer"
			path="dataTransfer"
			element={
				<DataTransfer
					onExport={handleExportHabits}
					onImport={handleImportHabits}
				/>
			}
		/>,
		<Route
			key="statistics"
			path="statistics"
			element={
				<Statistics
					{...{ habits }}
					colorPalette={modal?.colorPalette}
					completedDays={modal?.completedDays}
					color={dbColors[modal?.colorIndex]}
					frequency={modal?.frequency}
				/>
			}
		/>,
		<Route
			key="appearance"
			path="appearance"
			element={
				<AppearanceSettings />
			}
		/>
	];
	// --- Modal:END ---

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
								onOpenModal={handleUpdateModal}
							/>
						}
					/>

					<Route
						path={`${publicUrl}/modal`}
						element={
							<Modal
								key={modal?.modalTitle}
								title={modal?.modalTitle}
								onClose={() => {
									// handleUpdateModal({ type: 'close' })
									navigate(-1);
								}}
							/>
						}
					>
						{modalComponents}
					</Route>
				</Routes>
			</AnimatePresence>
		</main>
	);
}

export default App;