import styles from '../../css/MenuItemList.module.css';

// components
import SectionHeader from '../Containment/SectionHeader';

function MenuItemList({ categoryStyle, title, titleStyle, listStyle, children }) {
	return (
		<div
			style={categoryStyle}
			className={styles.category}
		>
			<SectionHeader
				title={title}
				titleStyle={titleStyle}
			/>

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