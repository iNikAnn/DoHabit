import styles from '../../css/StreakHistory.module.css';

function StreakHistory({ streaks, colorPalette }) {

	const { darkenedColor } = colorPalette;

	return (
		<div className={styles.streaks}>
			{streaks.map(
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
		</div>
	);
}

export default StreakHistory;