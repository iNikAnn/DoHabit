import styles from '../../css/ProgressBar.module.css';

function ProgressBar({ baseColor, darkenedColor, segmentCount, todayProgress }) {
	const segmentList = new Array(segmentCount)
		.fill(null)
		.map((_, index) => {
			const segmentStyle = {
				backgroundColor: index + 1 <= todayProgress ? baseColor : darkenedColor,
				borderRadius: !index
					? '0 0 0 var(--border-radius-secondary)'
					: index + 1 === segmentCount
						? 'var(--border-radius-secondary) 0 0 0'
						: '0'
			};

			return (
				<div
					key={index}
					style={segmentStyle}
					className={styles.segment}
				/>
			);
		});

	return (
		<div className={styles.progressBar}>
			{segmentList.reverse()}
		</div>
	);
}

export default ProgressBar;