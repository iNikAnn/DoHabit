import styles from '../css/CreateHabitWindow.module.css';

function CreateHabitWindow({ onCreate }) {
	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault();
				onCreate(e.target)
			}}>
				<label>
					Habit title:
					<input type="text" name="title" id="title" />
				</label>

				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreateHabitWindow;