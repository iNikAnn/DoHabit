import styles from '../../css/ProgressBar.module.css';

function ProgressBar({ color, dimmedColor, segmentCount }) {
	const segmentList = new Array(segmentCount)
		.fill(null)
		.map((segment) => {
			return (
				<div
					style={{ backgroundColor: dimmedColor }}
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
	)
}

export default ProgressBar;