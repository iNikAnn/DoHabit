import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { useHabitsStore } from '@entities/habit';
import { Button } from '@shared/ui';

interface RestoreHabitProps {
	habitId: string;
}

/**
 * Restores a habit from the archive.
 * Includes a native confirmation dialog before dispatching.
 */
function RestoreHabit({ habitId }: RestoreHabitProps) {
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const handleRestoreHabit = () => {
		// Simple confirmation to prevent accidental restores
		if (window.confirm('Are you sure you want to restore this habit?')) {
			habitsDispatch({
				type: 'setHabitArchiveStatus',
				payload: {
					habitId,
					isArchived: false
				}
			});
		}
	};

	return (
		<Button onClick={handleRestoreHabit}>
			<MdOutlineSettingsBackupRestore />
		</Button>
	);
}

export { RestoreHabit };