import styles from './StreakOverview.module.css';
import { useTranslation } from 'react-i18next';
import { FaAward } from 'react-icons/fa';
import { Card } from '@shared/ui';

interface StreakOverviewProps {
	currentStreak: number;
	longestStreak: number;
	color: string;
}

/**
 * Displays a summary card group showing current and longest habit streaks.
 */
function StreakOverview(props: StreakOverviewProps) {
	const {
		currentStreak,
		longestStreak,
		color
	} = props;

	const { t } = useTranslation();

	const percentageDifference = Math.floor(
		((currentStreak - longestStreak) / (longestStreak || 1)) * 100
	);

	return (
		<div className={styles.wrapper}>
			<Card
				title={t('habits.stats.currentStreak')}
				extra={(
					<div style={{ color: percentageDifference < 0 ? 'IndianRed' : '#57a639' }}>
						{percentageDifference + '%'}
					</div>
				)}
			>
				<div className={styles.content}>
					{currentStreak}
				</div>
			</Card>

			<Card
				title={t('habits.stats.longestStreak')}
				extra={<FaAward style={{ color }} />}
			>
				<div className={styles.content}>
					{longestStreak}
				</div>
			</Card>
		</div>
	);
}

export { StreakOverview };