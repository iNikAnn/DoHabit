import styles from '../../css/StreakHistory.module.css';

// react
import { useState } from 'react';

function StreakHistory({ streaks, colorPalette }) {

	const { darkenedColor } = colorPalette;
	const [listLength, setListLength] = useState(5);

	return (
		<div className={styles.history}>
			<ul className={styles.streaks}>
				{streaks.slice(0, listLength).map(
					(s, i) => (
						<li
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
									<small>{s.start}</small>
								</div>

								<div className={styles.dateWrapper}>
									<small className={`${styles.label} ${styles.end}`}>
										End:
									</small>
									<small>{s.end}</small>
								</div>
							</div>
						</li>
					)
				)}
			</ul>

			{listLength < streaks.length && (
				<button
					className={`text-button ${styles.showMoreBtn}`}
					onClick={() => setListLength((curr) => curr + 5)}
				>
					Show more
				</button>
			)}
		</div>
	);
}

export default StreakHistory;