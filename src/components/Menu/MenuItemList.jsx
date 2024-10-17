import styles from '../../css/MenuItemList.module.css';

function MenuItemList({ title, children }) {
	return (
		<div className={styles.category}>
			<h4 className={styles.title}>
				{title}
			</h4>

			<ul className={styles.list}>
				{children}
			</ul>
		</div>
	);
}

export default MenuItemList;