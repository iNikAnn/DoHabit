import styles from '../../css/ProgressBar.module.css';

function ProgressBar({ colorPalette, segmentCount, todayProgress }) {
	const { baseColor, darkenedColor } = colorPalette;

	const segmentList = new Array(segmentCount)
		.fill(null)
		.map((_, index) => (
			<div
				key={index}
				style={{ backgroundColor: index + 1 <= todayProgress ? baseColor : darkenedColor }}
				className={
					styles.segment +
					(!index ? (' ' + styles.first) : '') +
					(index + 1 === segmentCount ? (' ' + styles.last) : '')
				}
			/>
		));

	return (
		<div className={styles.progressBar}>
			{segmentList}
		</div>
	);
}

export default ProgressBar;