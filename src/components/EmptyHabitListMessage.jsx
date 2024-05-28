import styles from '../css/EmptyHabitListMessage.module.css';

function EmptyHabitsListMessage({ onOpenHabitEditor }) {
	return (
		<section
			className={styles.emptyHabitsListMessage}
		>
			<div className={styles.message}>
				<h3>Looks like you haven't created any habits yet.</h3>
				Why not create one now?
			</div>

			<button
				className={styles.createBtn}
				onClick={() => onOpenHabitEditor('Create new habit', 'createHabitWindow')}
			>
				Create New Habit
			</button>
		</section>
	);
}

export default EmptyHabitsListMessage;