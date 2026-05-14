import styles from './MenuList.module.css';
import { CSSProperties } from 'react';
import SectionHeader from '../../../../components/Containment/SectionHeader';
import { MenuItemProps } from '../model/types';
import { MenuItem } from './MenuItem';

interface Props {
	title: string;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
	items: MenuItemProps[];
}

/**
 * Generic list component to render grouped menu items.
 */
function MenuList(props: Props) {
	const {
		title,
		categoryStyle,
		titleStyle,
		listStyle,
		items
	} = props;

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
				{items.map((item) => (
					<li key={item.title}>
						<MenuItem
							{...item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export { MenuList };