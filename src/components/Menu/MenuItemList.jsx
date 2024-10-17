import styles from '../../css/MenuItemList.module.css';

function MenuItemList({ categoryStyle, title, titleStyle, listStyle, children }) {
	return (
		<div
			style={categoryStyle}
			className={styles.category}
		>
			<h4
				style={titleStyle}
				className={styles.title}
			>
				{title}
			</h4>

			<ul
				style={listStyle}
				className={styles.list}
			>
				{children}
			</ul>
		</div>
	);
}

export default MenuItemList;