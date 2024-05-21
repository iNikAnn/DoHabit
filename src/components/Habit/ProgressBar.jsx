import styles from '../../css/ProgressBar.module.css';

function ProgressBar({ color, dimmedColor, segmentCount, todayProgress }) {
	const segmentList = new Array(segmentCount)
		.fill(null)
		.map((_, index) => {
			const segmentStyle = {
				backgroundColor: index + 1 <= todayProgress ? color : dimmedColor
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
		<div
			className={styles.progressBar}
		>
			{segmentList}
		</div>
	);
}

export default ProgressBar;