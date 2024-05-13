import './App.css';

// react
import React, { useEffect, useState } from 'react';

// components
import Header from './components/Header';
import HabitsList from './components/HabitsList';
import Modal from './components/Modal';
import CreateHabitWindow from './components/CreateHabitWindow';

// utils
import createHabit from './utils/createHabit';
import markHabitAsCompleted from './utils/markHabitAsCompleted';

// db
import icons from './db/dbIcons';

function App() {
	const [habits, setHabits] = useState(() => {
		const data = localStorage.getItem('habits');
		return data ? JSON.parse(data) : [];
	});

	// save habits to local storage
	useEffect(() => {
		localStorage.setItem('habits', JSON.stringify(habits));
	}, [habits]);

	// create habit
	const handleCreateHabit = (data) => {
		setHabits(createHabit(habits, data));
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

	useEffect(() => {
		document.body.style.overflow = modalIsVisible ? 'hidden' : 'auto';
	}, [modalIsVisible]);

	const handleOpenModal = (title, content) => {
		setModalTitle(title);
		setModalContent(content);
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
				onOpenCreateHabitWindow={() => handleOpenModal('Create new habit', 'createHabitWindow')}
			/>

			<main>
				<HabitsList
					data={habits}

					// 'on' functions
					onOpenCreateHabitWindow={() => handleOpenModal('Create new habit', 'createHabitWindow')}
					onMarkHabitAsCompleted={handleMarkHabitAsCompleted}

					// db
					icons={icons}
				/>
			</main>

			{modalIsVisible && (
				<Modal
					title={modalTitle}

					// 'on' functions
					onClose={handleCloseModal}
				>
					{modalContent === 'createHabitWindow' && (
						<CreateHabitWindow
							habits={habits}

							// 'on' functions
							onCreate={(data) => handleCreateHabit(data)}

							//db
							icons={icons}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default App;
