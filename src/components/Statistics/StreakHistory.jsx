import styles from '../../css/StreakHistory.module.css';

// react
import { useState } from 'react';

function StreakHistory({ streaks, colorPalette }) {

	const { darkenedColor } = colorPalette;
	const [listLength, setListLength] = useState(5);

	return (
		<div className={styles.streaks}>
			{streaks.slice(0, listLength).map(
				(s) => (
					<div
						style={{ borderColor: darkenedColor }}
						className={styles.card}
					>
						<div className={styles.length}>
							{s.length}
						</div>

						<div className={styles.desc}>
							<div className={styles.dateWrapper}>
								<small className={`${styles.label} ${styles.start}`}>
									Start:
								</small>
								<small>{s.start}</small>
							</div>

							<div className={styles.dateWrapper}>
								<small className={`${styles.label} ${styles.end}`}>
									End:
								</small>
								<small>{s.end}</small>
							</div>
						</div>
					</div>
				)
			)}

			{listLength < streaks.length && (
				<button
					className='text-button'
					onClick={() => setListLength((curr) => curr + 5)}
				>
					Show more
				</button>
			)}
		</div>
	);
}

export default StreakHistory;