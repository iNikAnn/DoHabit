import styles from './AchievementsPage.module.css';
import { AchievementList } from '@widgets/achievement-list';

function AchievementsPage() {
	return (
		<div className={styles.page}>
			<AchievementList />
		</div>
	);
}

export { AchievementsPage };