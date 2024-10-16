import './App.css';

// react
import React, { useReducer } from 'react';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// context
import { SettingsContext, SettingsDispatchContext } from './context/settingsContext';

// components
import Header from './components/Header';
import HabitList from './components/HabitList';
import Modal from './components/Modal';
import HabitEditor from './components/HabitEditor/HabitEditor';
import Placeholder from './components/Placeholder';
import Menu from './components/Menu/Menu';
import Diary from './components/Diary/Diary';
import Statistics from './components/Statistics/Statistics';
import Archive from './components/Archive/Archive';
import DataTransfer from './components/DataTransfer/DataTransfer';

// utils
import initHabits from './utils/initHabits';
import initMainDiary from './utils/initMainDiary';
import settingsReducer from './utils/settingsReducer';
import habitsReducer from './utils/habitsReducer';
import mainDiaryReducer from './utils/mainDiaryReducer';
import modalReducer from './utils/modalReducer';
import exportHabits from './utils/exportHabits';
import importHabits from './utils/importHabits';

// icons
import { ReactComponent as Calendar } from './img/calendar.svg';
import { MdAddToPhotos } from "react-icons/md";

// db
import dbIcons from './db/dbIcons';
import dbColors from './db/dbColors';

function App() {
	// --- Settigns:START ---
	const [settings, settingsDispatch] = useReducer(settingsReducer, {});
	// --- Settings:END ---

	// --- Habits:START ---
	const [habits, habitsDispatch] = useReducer(habitsReducer, null, initHabits);
	const handleUpdateHabits = (actions) => habitsDispatch(actions);
	const filteredHabits = habits.filter((h) => !h.isArchived);
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
		)
	}
	// --- Modal:END ---

	const mainVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2, ease: 'easeOut' }
	};

	return (
		<SettingsContext.Provider value={settings}>
			<SettingsDispatchContext.Provider value={settingsDispatch}>
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
							<motion.div
								key="mainContent"
								{...mainVariants}
							>
								<Header onOpenModal={handleUpdateModal} />

								<HabitList
									{...{ habits: filteredHabits, dbIcons, dbColors }}

									onOpenModal={handleUpdateModal}
									onUpdate={handleUpdateHabits}
								/>

								{filteredHabits.length === 0 && (
									<Placeholder
										image={<Calendar />}
										title="No active habits found"
										desc="Why not create one now?"
										textOnButton="Create First Habit"
										buttonIcon={<MdAddToPhotos />}
										onClick={() => handleUpdateModal({
											type: 'open',
											modalContent: 'habitEditor',
											modalTitle: 'Create new habit'
										})}
									/>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</main>
			</SettingsDispatchContext.Provider>
		</SettingsContext.Provider>
	);
}

export default App;