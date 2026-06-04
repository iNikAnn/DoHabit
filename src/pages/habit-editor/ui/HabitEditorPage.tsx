import styles from './HabitEditorPage.module.css';
import { HabitForm } from '@widgets/habit-form';
import { useInitialRouteState } from '@shared/lib/router';

/**
 * Entry point for creating or modifying habits.
 */
function HabitEditorPage() {
	const { habitId } = useInitialRouteState<'HABIT_EDITOR'>();

	return (
		<div className={styles.wrapper}>
			<HabitForm habitId={habitId} />
		</div>
	);
}

export { HabitEditorPage };