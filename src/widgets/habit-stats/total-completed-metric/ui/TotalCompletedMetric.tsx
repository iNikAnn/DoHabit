import styles from './TotalCompletedMetric.module.css';
import { FaHashtag } from 'react-icons/fa';
import { CompletedDay } from '@entities/habit';
import { Card } from '@shared/ui';

interface Props {
	days: CompletedDay[];
	color: string;
}

/**
 * Displays the total number of completions for a habit over a selected period.
 */
function TotalCompletedMetric({ days, color }: Props) {
	return (
		<Card
			title='Total Completed'
			extra={<FaHashtag style={{ color }} />}
		>
			<div className={styles.content}>
				{days.length}
			</div>
		</Card>
	);
}

export { TotalCompletedMetric };