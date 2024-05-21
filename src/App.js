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

// db
import dbIcons from './db/dbIcons';
import dbColors from './db/dbColors';

function App() {
	const [habits, setHabits] = useState(() => {
		let data = localStorage.getItem('habits');

		// update db
		if (data) {
			data = updateDB(data, dbColors)
		};;

		return data || [];
	});

	// save habits to local storage
	useEffect(() => {
		localStorage.setItem('habits', JSON.stringify(habits));
	}, [habits]);

	// update habit
	const handleUpdateHabits = (data, mode, originalHabitTitle) => {
		setHabits(getUpdatedHabits(habits, data, mode, originalHabitTitle));
		handleCloseModal();
	};

	// mark habit completion for the day
	const handleMarkHabitAsCompleted = (title) => {
		setHabits(markHabitAsCompleted(habits, title));
	};

	// modal
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, setModalContent] = useState('');
	const [modalContentMode, setModalContentMode] = useState(null);

	useEffect(() => {
		document.body.style.overflow = modalIsVisible ? 'hidden' : 'auto';
	}, [modalIsVisible]);

	const handleOpenModal = (title, content, modeObj) => {
		setModalTitle(title);
		setModalContent(content);
		setModalContentMode(modeObj || null);
		setModalIsVisible(true);
	};

	const handleCloseModal = () => {
		setModalIsVisible(false);
		setModalTitle('');
		setModalContent('');
	};

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenHabitEditor={() => handleOpenModal('Create new habit', 'createHabitWindow')}
			/>

			<main>
				<HabitList
					habits={habits}

					// 'on' functions
					onOpenHabitEditor={(modeObj) => handleOpenModal(`${modeObj ? 'Edit' : 'Create new'} habit`, 'createHabitWindow', modeObj)}
					onMarkHabitAsCompleted={handleMarkHabitAsCompleted}

					// db
					dbIcons={dbIcons}
					dbColors={dbColors}
				/>
			</main>

			{modalIsVisible && (
				<Modal
					title={modalTitle}

					// 'on' functions
					onClose={handleCloseModal}
				>
					{modalContent === 'createHabitWindow' && (
						<HabitEditor
							modeObj={modalContentMode}
							habits={habits}

							// 'on' functions
							onUpdate={(data, mode, originalHabitTitle) => handleUpdateHabits(data, mode, originalHabitTitle)}

							//db
							dbIcons={dbIcons}
							dbColors={dbColors}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default App;
