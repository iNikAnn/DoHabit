import styles from '../../css/MenuItem.module.css';

function MenuItem({ icon, title, desc, onClick }) {
	return (
		<li>
			<button className={styles.menuItem}>
				{icon}
				<div className={styles.textWrapper}>
					<h3 className={styles.title}>
						{title}
					</h3>

					<small className={styles.desc}>
						{desc}
					</small>
				</div>
			</button>
		</li>
	)
}

export default MenuItem;