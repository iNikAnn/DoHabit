import styles from '../../css/Archive.module.css';
import { HabitList } from '@widgets/habit-list';

function Archive() {
	return (
		<div className={styles.archive}>
			<HabitList isArchive />
		</div>
	);
}

export default Archive;