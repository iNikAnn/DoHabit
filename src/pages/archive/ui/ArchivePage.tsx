import styles from './ArchivePage.module.css';
import { HabitList } from '@widgets/habit-list';

/**
 * Displays deactivated habits.
 */
function ArchivePage() {
	return (
		<div className={styles.archive}>
			<HabitList isArchive />
		</div>
	);
}

export { ArchivePage };