import './App.css';

// react
import React, { useEffect, useState } from 'react';

// components
import Header from './components/Header';
import HabitList from './components/HabitList';
import Modal from './components/Modal';
import HabitEditor from './components/HabitEditor/HabitEditor';

// utils
import getUpdatedHabits from './utils/getUpdatedHabits';
import markHabitAsCompleted from './utils/markHabitAsCompleted';
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
	const handleUpdateHabits = (data, mode, originalHabitTitle) => {
		setHabits(getUpdatedHabits(habits, data, mode, originalHabitTitle));
		handleToggleModal();
	};

	// mark habit completion for the day
	const handleMarkHabitAsCompleted = (title) => {
		setHabits(markHabitAsCompleted(habits, title));
	};

	// modal
	const [modal, setModal] = useState(null);

	useEffect(() => {
		document.body.style.overflow = modal ? 'hidden' : 'auto';
	}, [modal]);

	const handleToggleModal = (props) => {
		if (!modal) validateModalProps(props);
		setModal(modal ? null : props);
	};

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenHabitEditor={handleToggleModal}
			/>

			<main>
				<HabitList
					{...{ habits, dbIcons, dbColors }}

					// 'on' functions
					onOpenHabitEditor={handleToggleModal}
					onMarkHabitAsCompleted={handleMarkHabitAsCompleted}
				/>
			</main>

			{modal && (
				<Modal
					title={modal.modalTitle}

					// 'on' functions
					onClose={handleToggleModal}
				>
					{modal.modalContent === 'habitEditor' && (
						<HabitEditor
							{...{ habits, dbIcons, dbColors }}
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
