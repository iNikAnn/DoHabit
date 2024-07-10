import styles from '../../css/Archive.module.css';

// components
import HabitList from '../HabitList';
import Placeholder from '../Placeholder';

// icons
import { ReactComponent as Table } from '../../img/table-of-contents.svg'

function Archive({ habits, dbIcons, dbColors, onUpdate }) {
	const filteredHabits = habits.filter(h => h.isArchived);

	return (
		<div>
			<HabitList
				archive
				habits={filteredHabits}
				{...{ dbIcons, dbColors, onUpdate }}
			/>

			{!filteredHabits.length && (
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