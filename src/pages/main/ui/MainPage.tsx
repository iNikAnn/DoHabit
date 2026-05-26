import styles from './MainPage.module.css';
import { motion } from 'framer-motion';
import { variants } from '../model/page.animations';
import { AppHeader } from '@widgets/app-header';
import { HabitList } from '@widgets/habit-list';

function MainPage() {
	return (
		<motion.div
			className={styles.mainPage}
			variants={variants}
			initial='initial'
			animate='animate'
			exit='exit'
		>
			<AppHeader />

			<div className={styles.content}>
				<HabitList />
			</div>
		</motion.div>
	);
}

export { MainPage };