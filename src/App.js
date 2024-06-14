import './App.css';

// react
import React, { useEffect, useState } from 'react';

// components
import Header from './components/Header';
import HabitList from './components/HabitList';
import Modal from './components/Modal';
import HabitEditor from './components/HabitEditor/HabitEditor';
import HabitProfile from './components/HabitProfile/HabitProfile';

// utils
import getUpdatedHabits from './utils/getUpdatedHabits';
import updateDB from './utils/updateDB';
import validateModalProps from './utils/validateModalProps';

// db
import dbIcons from './db/dbIcons';
import dbColors from './db/dbColors';

function App() {
	const [habits, setHabits] = useState(() => {
		let data = localStorage.getItem('habits');

		// update db
		if (data) {
			data = updateDB(data, dbColors);
		};

		return data || [];
	});

	// save habits to local storage
	useEffect(() => {
		localStorage.setItem('habits', JSON.stringify(habits));
	}, [habits]);

	// update habit
	const handleUpdateHabits = (props) => {
		setHabits(getUpdatedHabits(habits, props));
	};

	// modal
	const [modal, setModal] = useState(null);

	useEffect(() => {
		document.body.style.overflow = modal ? 'hidden' : 'auto';
	}, [modal]);

	const handleOpenModal = (props) => {
		if (!modal) validateModalProps(props);
		setModal(modal ? null : props);
	};

	const handleCloseModal = () => {
		setModal(null);
	};

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenHabitEditor={handleOpenModal}
			/>

			<main>
				<HabitList
					{...{ habits, dbIcons, dbColors }}

					// 'on' functions
					onOpenModal={handleOpenModal}
					onUpdateProgress={handleUpdateHabits}
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

					{modal.modalContent === 'habitProfile' && (
						<HabitProfile
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
