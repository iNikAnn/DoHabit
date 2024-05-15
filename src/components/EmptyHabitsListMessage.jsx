import styles from '../css/EmptyHabitsListMessage.module.css';

function EmptyHabitsListMessage({ onOpenHabitEditor }) {
	return (
		<div
			className={styles.emptyHabitsListMessage}
		>
			<div className={styles.message}>
				<h3>Looks like you haven't created any habits yet.</h3>
				Why not create one now?
			</div>

			<button
				className={styles.createBtn}
				onClick={onOpenHabitEditor}
			>
				Create New Habit
			</button>
		</div>
	);
}

export default EmptyHabitsListMessage;