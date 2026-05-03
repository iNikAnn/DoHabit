import styles from '../css/MainPage.module.css';

// framer
import { motion } from 'framer-motion';

// components
import Header from './Header';
import HabitList from './HabitList';
import Placeholder from './Placeholder';

// icons
import { CalendarIcon } from '@shared/assets';
import { MdAddToPhotos } from 'react-icons/md';

import { useHabitsStore } from '../stores/habitsStore';

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
			<Header />

			<HabitList habits={filteredHabits} />

			{filteredHabits.length === 0 && (
				<Placeholder
					image={<CalendarIcon />}
					title='No active habits found'
					desc='Why not create one now?'
					textOnButton='Create First Habit'
					buttonIcon={<MdAddToPhotos />}
					to='/modal/habitEditor'
					state={{ modalTitle: 'Create new habit' }}
				/>
			)}
		</motion.div>
	);
}

export default MainPage;