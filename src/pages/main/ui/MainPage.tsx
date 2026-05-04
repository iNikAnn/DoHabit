import styles from './MainPage.module.css';
import { motion } from 'framer-motion';
import { AppHeader } from '@widgets/app-header';
import { HabitList } from '@widgets/habit-list';

const mainVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: .3, ease: 'easeOut' }
};

function MainPage() {
	return (
		<motion.div
			className={styles.mainPage}
			{...mainVariants}
		>
			<AppHeader />
			<HabitList />
		</motion.div>
	);
}

export { MainPage };