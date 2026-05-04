import styles from './MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import { AppHeader } from '@widgets/app-header';
import HabitList from '../../../components/HabitList';
import Placeholder from '../../../components/Placeholder';

// icons
import { CalendarIcon } from '@shared/assets';
import { MdAddToPhotos } from 'react-icons/md';

import { useHabitsStore } from '../../../stores/habitsStore';

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function MainPage() {

	const habits = useHabitsStore((s) => s.habits);
	const filteredHabits = habits.filter((h) => !h.isArchived);

	return (
		<motion.div className={styles.mainPage} {...mainVariants}>
			<AppHeader />

			<HabitList habits={filteredHabits} />

			{filteredHabits.length === 0 && (
				<Placeholder
					image={<CalendarIcon />}
					title='No active habits found'
					desc='Why not create one now?'
					textOnButton='Create First Habit'
					buttonIcon={<MdAddToPhotos />}
					to='/modal/habit-editor'
					state={{ modalTitle: 'Create new habit' }}
				/>
			)}
		</motion.div>
	);
}

export { MainPage };