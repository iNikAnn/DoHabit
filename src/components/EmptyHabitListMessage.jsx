import styles from '../css/EmptyHabitListMessage.module.css';

function EmptyHabitsListMessage({ onOpenModal }) {
	const modalProps = {
		modalContent: 'habitEditor',
		modalTitle: 'Create new habit',
	};

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
				onClick={() => onOpenModal(modalProps)}
			>
				Create New Habit
			</button>
		</section>
	);
}

export default EmptyHabitsListMessage;