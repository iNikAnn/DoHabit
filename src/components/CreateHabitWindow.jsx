import { useEffect, useState } from 'react';

// react
import styles from '../css/CreateHabitWindow.module.css';

function CreateHabitWindow(props) {
	const {
		// 'on' functions
		onCreate,

		habits
	} = props;

	const [inputTitle, setInputTitle] = useState('');
	const [alreadyExist, setAlreadyExist] = useState(false);

	useEffect(() => {
		const match = habits.find((habit) => habit.title === inputTitle);

		if (match) {
			setAlreadyExist(true);
		} else {
			setAlreadyExist(false);
		};
	}, [inputTitle]);

	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault();
				onCreate(e.target)
			}}>
				<label>
					Habit title:
					<input type="text" name="title" id="title"
						className={`${styles.input} ${alreadyExist ? styles.alreadyExist : ''}`}
						value={inputTitle}
						onChange={(e) => setInputTitle(e.target.value)}
					/>
				</label>

				<button type='submit' disabled={alreadyExist}>
					Create
				</button>
			</form>
		</div>
	);
}

export default CreateHabitWindow;