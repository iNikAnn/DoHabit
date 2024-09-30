import styles from '../../css/CardHeader.module.css';

function CardHeader({ title, icon, iconColor }) {
	return (
		<div className={styles.header}>
			<h3>{title}</h3>

			<span
				className={styles.iconWrapper}
				style={{ color: iconColor }}
			>
				{icon}
			</span>
		</div>
	);
}

export default CardHeader;