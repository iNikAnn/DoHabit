import styles from './StreakHistory.module.css';
import { useState } from 'react';
import { FaBinoculars } from 'react-icons/fa';
import { type ColorVariants } from '@shared/lib/theme';
import { type Streak } from '@shared/model';
import { Button, Card } from '@shared/ui';

interface StreakHistoryProps {
	streaks: Streak[];
	colorVariants: ColorVariants;
}

/**
 * Renders a list of habit streaks recorded over a specific period.
 */
function StreakHistory(props: StreakHistoryProps) {
	const {
		streaks,
		colorVariants
	} = props;

	const { baseColor, darkenedColor } = colorVariants;
	const [listLength, setListLength] = useState(5);
	const streakList = streaks.slice(0, listLength);

	// 1. Handle empty state
	if (streakList.length === 0) {
		return null;
	}

	// 2. Render list
	return (
		<Card
			title='Streak History'
			description='Shows streaks of 2 days or more.'
			extra={<FaBinoculars style={{ color: baseColor }} />}
		>
			<div className={styles.history}>
				<ul className={styles.streaks}>
					{streakList.map(
						(s, i) => (
							<li
								key={s.length + s.start + s.end}
								style={{ borderColor: darkenedColor }}
								className={`${styles.card} ${i === streaks.length - 1 ? styles.isLast : ''}`}
							>
								<div className={styles.length}>
									{s.length}
								</div>

								<div className={styles.desc}>
									<div className={styles.dateWrapper}>
										<small className={`${styles.label} ${styles.start}`}>
											Start:
										</small>
										<small>{new Date(s.start).toLocaleDateString()}</small>
									</div>

									<div className={styles.dateWrapper}>
										<small className={`${styles.label} ${styles.end}`}>
											End:
										</small>
										<small>{new Date(s.end).toLocaleDateString()}</small>
									</div>
								</div>
							</li>
						)
					)}
				</ul>

				{listLength < streaks.length && (
					<div className={styles.buttonWrapper}>
						<Button
							variant='text'
							onClick={() => setListLength((curr) => curr + 5)}
						>
							Show more
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
}

export { StreakHistory };