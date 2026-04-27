import styles from '../../css/MenuItemList.module.css';

// types
import { CSSProperties } from 'react';

// components
import SectionHeader from '../Containment/SectionHeader';

interface Props {
	title: string;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
	children: React.ReactNode;
}

function MenuItemList({ categoryStyle, title, titleStyle, listStyle, children }: Props) {
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