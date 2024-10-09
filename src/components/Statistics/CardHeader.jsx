import styles from '../../css/CardHeader.module.css';

function CardHeader({ title, desc, icon, iconColor }) {
	return (
		<div>
			<div className={styles.top}>
				<h3>{title}</h3>

				<span
					className={styles.iconWrapper}
					style={{ color: iconColor }}
				>
					{icon}
				</span>
			</div>

			{desc && (
				<div className={styles.desc}>
					<small>
						{desc}
					</small>
				</div>
			)}
		</div>
	);
}

export default CardHeader;