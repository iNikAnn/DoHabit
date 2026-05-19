import styles from './HabitEditorPage.module.css';
import { useLocation } from 'react-router-dom';
import { HabitForm } from '@widgets/habit-form';

/**
 * Entry point for creating or modifying habits.
 */
function HabitEditorPage() {
	const location = useLocation();
	const habitId = location.state?.habitId as string | undefined;

	return (
		<div className={styles.wrapper}>
			<HabitForm habitId={habitId} />
		</div>
	);
}

export { HabitEditorPage };