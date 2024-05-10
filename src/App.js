import React from 'react';
import './App.css';

// components
import Header from './components/Header';
import HabitsList from './components/HabitsList';

function App() {
	return (
		<div className="App">
			<Header />

			<main>
				<HabitsList />
			</main>
		</div>
	);
}

export default App;
