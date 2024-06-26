import './App.css';

// react
import React, { useEffect, useReducer, useState } from 'react';

// components
import Header from './components/Header';
import HabitList from './components/HabitList';
import Modal from './components/Modal';
import HabitEditor from './components/HabitEditor/HabitEditor';
import Menu from './components/Menu/Menu';
import Diary from './components/Diary/Diary';
import DataTransfer from './components/DataTransfer/DataTransfer';

// utils
import habitsReducer from './utils/habitsReducer';
import updateDB from './utils/updateDB';
import validateModalProps from './utils/validateModalProps';
import exportHabits from './utils/exportHabits';
import importHabits from './utils/importHabits';

// db
import dbIcons from './db/dbIcons';
import dbColors from './db/dbColors';

function App() {
	let initialHabits = localStorage.getItem('habits');
	initialHabits = initialHabits ? updateDB(initialHabits, dbColors) : [];

	const [habits, dispatch] = useReducer(habitsReducer, initialHabits);

	// save habits to local storage
	useEffect(
		() => { localStorage.setItem('habits', JSON.stringify(habits)) },
		[habits]
	);

	// update habit
	const handleUpdateHabits = (actions) => dispatch(actions);

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
					{...{ habits, dbIcons, dbColors }}

					// 'on' functions
					onOpenModal={handleOpenModal}
					onUpdate={handleUpdateHabits}
				/>
			</main>

			{modal && (
				<Modal
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

					{modal.modalContent === 'dataTransfer' && (
						<DataTransfer
							onExport={handleExportHabits}
							onImport={handleImportHabits}
						/>
					)}

					{modal.modalContent === 'diary' && (
						<Diary
							{...{ habits }}
							habitTitle={modal.habitTitle}

							// 'on' functions
							onUpdate={handleUpdateHabits}
						/>
					)}

				</Modal>
			)}
		</div>
	);
}

export default App;
