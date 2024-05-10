import React, { useState } from 'react';
import './App.css';

// components
import Header from './components/Header';
import HabitsList from './components/HabitsList';
import Modal from './components/Modal';

function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	return (
		<div className="App">
			<Header />

			<main>
				<HabitsList />
			</main>

			{modalIsVisible && (
				<Modal
					// 'on' functions
					onClose={() => setModalIsVisible(false)}
				>
				</Modal>
			)}
		</div>
	);
}

export default App;
