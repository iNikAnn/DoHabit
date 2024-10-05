import './App.css';

// react
import React, { useReducer, useState } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import Overlay from './components/Overlay';
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
import habitsReducer from './utils/habitsReducer';
import mainDiaryReducer from './utils/mainDiaryReducer';
import modalReducer from './utils/modalReducer';
import validateModalProps from './utils/validateModalProps';
import exportHabits from './utils/exportHabits';
import importHabits from './utils/importHabits';

// icons
import { ReactComponent as Calendar } from './img/calendar.svg';
import { MdAddToPhotos } from "react-icons/md";

// db
import dbIcons from './db/dbIcons';
import dbColors from './db/dbColors';

function App() {
	// --- Habits:START ---
	const [habits, habitsDispatch] = useReducer(habitsReducer, null, initHabits);
	const handleUpdateHabits = (actions) => habitsDispatch(actions);
	// --- Habits:END ---

	// --- Main Diary:START ---
	const [mainDiary, mainDiaryDispatch] = useReducer(mainDiaryReducer, null, initMainDiary);
	const handleUpdateMainDiary = (actions) => mainDiaryDispatch(actions);
	// --- Main Diary:END ---

	// --- Modal:START ---
	const [modal, modalDispatch] = useReducer(modalReducer, { history: [] });
	const handleUpdateModal = (actions) => modalDispatch(actions);
	// --- Modal:END ---

	// data transfer
	const handleExportHabits = () => exportHabits(habits);
	const handleImportHabits = () => importHabits(handleUpdateHabits);

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenModal={handleUpdateModal}
			/>

			<main>
				<HabitList
					habits={habits.filter(h => !h.isArchived)}
					{...{ dbIcons, dbColors }}

					// 'on' functions
					onOpenModal={handleUpdateModal}
					onUpdate={handleUpdateHabits}
				/>

				{!habits.filter(h => !h.isArchived).length && (
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
			</main>

			<AnimatePresence>
				{modal.modalContent && (
					<>
						<Overlay key='overlay' />

						<Modal
							key={modal.modalTitle}
							title={modal.modalTitle}

							// 'on' functions
							onClose={() => handleUpdateModal({ type: 'close' })}
						>
							{modal.modalContent === 'habitEditor' && (
								<HabitEditor
									{...{ habits, dbIcons, dbColors }}
									habitTitle={modal.habitTitle}

									// 'on' functions
									onUpdate={handleUpdateHabits}
									onClose={() => handleUpdateModal({ type: 'close' })}
								/>
							)}

							{modal.modalContent === 'menu' && (
								<Menu
									// 'on' functions
									onOpenModal={handleUpdateModal}
								/>
							)}

							{modal.modalContent === 'archive' && (
								<Archive
									{...{ habits, dbIcons, dbColors }}
									onUpdate={handleUpdateHabits}
								/>
							)}

							{modal.modalContent === 'dataTransfer' && (
								<DataTransfer
									onExport={handleExportHabits}
									onImport={handleImportHabits}
								/>
							)}

							{modal.modalContent === 'diary' && (
								<Diary
									habitTitle={modal.habitTitle}
									accentColor={dbColors[modal.colorIndex]}
									diary={
										modal.habitTitle
											? habits.find((h) => h.title === modal.habitTitle).diary
											: mainDiary
									}

									// 'on' functions
									onUpdate={handleUpdateHabits}
									onUpdateMainDiary={handleUpdateMainDiary}
								/>
							)}

							{modal.modalContent === 'statistics' && (
								<Statistics
									{...{ habits }}
									completedDays={modal.completedDays}
									color={dbColors[modal.colorIndex]}
									frequency={modal.frequency}
								/>
							)}
						</Modal>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default App;