import styles from './TotalCompletedMetric.module.css';
import { useTranslation } from 'react-i18next';
import { FaHashtag } from 'react-icons/fa';
import { type CompletedDay } from '@entities/habit';
import { Card } from '@shared/ui';

interface Props {
	days: CompletedDay[];
	color: string;
}

/**
 * Displays the total number of completions for a habit over a selected period.
 */
function TotalCompletedMetric({ days, color }: Props) {
	const { t } = useTranslation();

	return (
		<Card
			title={t('habits.stats.totalCompleted')}
			extra={<FaHashtag style={{ color }} />}
		>
			<div className={styles.content}>
				{days.length}
			</div>
		</Card>
	);
}

export { TotalCompletedMetric };