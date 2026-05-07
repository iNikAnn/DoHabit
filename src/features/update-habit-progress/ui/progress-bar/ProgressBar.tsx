import clsx from 'clsx';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
	segmentCount: number;
	progress: number;
}

function ProgressBar(props: ProgressBarProps) {
	const {
		segmentCount,
		progress
	} = props;

	return (
		<div className={styles.progressBar}>
			{Array.from({ length: segmentCount }, (_, index) => (
				<div
					key={index}
					style={{
						backgroundColor: index + 1 <= progress
							? 'var(--habit-color-base)'
							: 'var(--habit-color-dark)'
					}}
					className={clsx(
						styles.segment,
						index + 1 <= progress && styles.passed,
						index === 0 && styles.first,
						index + 1 === segmentCount && styles.last
					)}
				/>
			))}
		</div>
	);
}

export default ProgressBar;