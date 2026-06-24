import styles from './MainPage.module.css';
import { motion } from 'framer-motion';
import { pageMotionProps } from '../model/page.animations';
import { AppHeader } from '@widgets/app-header';
import { HabitList } from '@widgets/habit-list';
import { WelcomeView } from '@widgets/welcome-view';
import { useSettingsStore } from '@entities/settings';

function MainPage() {
	const { hasSeenWelcome } = useSettingsStore((s) => s.settings);

	// 1. Render onboarding screen for first-time users
	if (!hasSeenWelcome) {
		return <WelcomeView />;
	}

	// 2. Render main application interface
	return (
		<motion.div
			className={styles.mainPage}
			{...pageMotionProps}
		>
			<AppHeader />

			<div className={styles.content}>
				<HabitList />
			</div>
		</motion.div>
	);
}

export { MainPage };