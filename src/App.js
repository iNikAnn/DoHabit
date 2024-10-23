import './App.css';

// react
import React, { useContext, useReducer } from 'react';

// context
import { SettingsContext } from './context/settingsContext';

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
	const handleImportHabits = () => importHabits(handleUpdateHabits);
	// --- Data Transfer:END ---

	// --- Modal:START ---
	const [modal, modalDispatch] = useReducer(modalReducer, null);
	const handleUpdateModal = (actions) => modalDispatch(actions);

	const modalComponents = {
		'habitEditor': (
			<HabitEditor
				{...{ habits, dbIcons, dbColors }}
				habitTitle={modal?.habitTitle}
				onUpdate={handleUpdateHabits}
				onClose={() => handleUpdateModal({ type: 'close' })}
			/>
		),
		'menu': (
			<Menu onOpenModal={handleUpdateModal} />
		),
		'archive': (
			<Archive
				{...{ habits, dbIcons, dbColors }}
				onUpdate={handleUpdateHabits}
			/>
		),
		'dataTransfer': (
			<DataTransfer
				onExport={handleExportHabits}
				onImport={handleImportHabits}
			/>
		),
		'diary': (
			<Diary
				habitTitle={modal?.habitTitle}
				accentColor={dbColors[modal?.colorIndex]}
				diary={
					modal?.habitTitle
						? habits.find((h) => h.title === modal?.habitTitle).diary
						: mainDiary
				}
				onUpdate={handleUpdateHabits}
				onUpdateMainDiary={handleUpdateMainDiary}
			/>
		),
		'statistics': (
			<Statistics
				{...{ habits }}
				colorPalette={modal?.colorPalette}
				completedDays={modal?.completedDays}
				color={dbColors[modal?.colorIndex]}
				frequency={modal?.frequency}
			/>
		),
		'appearanceSettings': (
			<AppearanceSettings />
		)
	}
	// --- Modal:END ---

	return (
		<main className="App">
			<AnimatePresence initial={false}>
				{modal ? (
					<Modal
						key={modal.modalTitle}
						title={modal.modalTitle}
						onClose={() => handleUpdateModal({ type: 'close' })}
					>
						{modalComponents[modal.modalContent]}
					</Modal>
				) : (
					<MainPage
						{...{ habits, dbIcons, dbColors }}
						onUpdate={handleUpdateHabits}
						onOpenModal={handleUpdateModal}
					/>
				)}
			</AnimatePresence>
		</main>
	);
}

export default App;