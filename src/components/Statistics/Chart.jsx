import styles from '../../css/Chart.module.css';

function Chart({ title, icon, children }) {
	return (
		<div className={styles.chart}>
			<div className={styles.header}>
				<h3>{title}</h3>
				{icon}
			</div>

			{children}
		</div>
	);
}

export default Chart;