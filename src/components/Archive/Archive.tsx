import styles from '../../css/Archive.module.css';

// stores
import { useHabitsStore } from '../../stores/habitsStore';

// components
import HabitList from '../HabitList';
import Placeholder from '../Placeholder';

// icons
import { ReactComponent as Table } from '../../img/table-of-contents.svg'

function Archive() {

	const habits = useHabitsStore((s) => s.habits);
	const filteredHabits = habits.filter(h => h.isArchived);

	return (
		<div className={styles.archive}>
			{filteredHabits.length > 0 ? (
				<HabitList
					isArchive
					habits={filteredHabits}
				/>
			) : (
				<Placeholder
					image={<Table />}
					title="No archived habits found"
					desc="You can archive a habit by editing it."
				/>
			)}
		</div>
	);
}

export default Archive;