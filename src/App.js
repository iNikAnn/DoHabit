import './App.css';

// react
import React, { useEffect, useReducer, useState } from 'react';

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
import habitsReducer from './utils/habitsReducer';
import updateDB from './utils/updateDB';
import mainDiaryReducer from './utils/mainDiaryReducer';
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
	const [habits, habitsDispatch] = useReducer(habitsReducer, null, initHabits);
	const handleUpdateHabits = (actions) => habitsDispatch(actions);

	// main diary
	const [mainDiary, mainDiaryDispatch] = useReducer(
		mainDiaryReducer,
		null,
		() => {
			const storedDiary = localStorage.getItem('mainDiary');
			return storedDiary ? JSON.parse(storedDiary) : [];
		}
	);

	useEffect(
		() => { localStorage.setItem('mainDiary', JSON.stringify(mainDiary)) },
		[mainDiary]
	);

	const handleUpdateMainDiary = (actions) => mainDiaryDispatch(actions);

	// modal
	const [modal, setModal] = useState(null);
	const [modalHistory, setModalHistory] = useState([]);

	useEffect(
		() => { document.body.style.overflow = modal ? 'hidden' : 'auto' },
		[modal]
	);

	const handleOpenModal = (props) => {
		// if (!modal) validateModalProps(props);
		validateModalProps(props);
		// setModal(modal ? null : props);

		if (modal) setModalHistory((mh) => [...mh, modal]);

		setModal(props);
	};

	const handleCloseModal = () => {
		if (modalHistory.length > 0) {
			const mh = [...modalHistory];
			handleOpenModal(mh.pop());
			setModalHistory(mh);
		} else {
			setModal(null);
		};
	};

	// data transfer
	const handleExportHabits = () => exportHabits(habits);
	const handleImportHabits = () => importHabits(handleUpdateHabits);

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenHabitEditor={handleOpenModal}
				onOpenModal={handleOpenModal}
			/>

			<main>
				<HabitList
					habits={habits.filter(h => !h.isArchived)}
					{...{ dbIcons, dbColors }}

					// 'on' functions
					onOpenModal={handleOpenModal}
					onUpdate={handleUpdateHabits}
				/>

				{!habits.filter(h => !h.isArchived).length && (
					<Placeholder
						image={<Calendar />}
						title="No active habits found"
						desc="Why not create one now?"
						textOnButton="Create First Habit"
						buttonIcon={<MdAddToPhotos />}
						onClick={() => handleOpenModal({
							modalContent: 'habitEditor',
							modalTitle: 'Create new habit',
						})}
					/>
				)}
			</main>

			<AnimatePresence>
				{modal && (
					<>
						<Overlay key='overlay' />

						<Modal
							key={modal.modalTitle}
							modalHistory={modalHistory}
							title={modal.modalTitle}

							// 'on' functions
							onClose={handleCloseModal}
						>
							{modal.modalContent === 'habitEditor' && (
								<HabitEditor
									{...{ habits, dbIcons, dbColors }}
									habitTitle={modal.habitTitle}

									// 'on' functions
									onUpdate={handleUpdateHabits}
									onClose={handleCloseModal}
								/>
							)}

							{modal.modalContent === 'menu' && (
								<Menu
									// 'on' functions
									onOpenModal={handleOpenModal}
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