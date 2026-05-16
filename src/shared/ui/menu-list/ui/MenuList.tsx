import styles from './MenuList.module.css';
import { CSSProperties, ReactNode } from 'react';
import { ItemIconSize, MenuItemProps } from '../model/types';
import { MenuItem } from './MenuItem';
import { SectionHeader } from '@shared/ui';

interface Props {
	title?: string;
	action?: ReactNode;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	items: MenuItemProps[];
}

/**
 * Generic list component to render grouped menu items.
 */
function MenuList(props: Props) {
	const {
		title,
		action,
		categoryStyle,
		titleStyle,
		listStyle,
		iconSize,
		truncateDescription,
		items
	} = props;

	return (
		<div
			style={categoryStyle}
			className={styles.category}
		>
			{title && (
				<SectionHeader
					title={title}
					titleStyle={titleStyle}
					action={action}
				/>
			)}

			<ul
				style={listStyle}
				className={styles.list}
			>
				{items.map((item) => (
					<li key={item.title}>
						<MenuItem
							{...item}
							iconSize={iconSize}
							truncateDescription={truncateDescription}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export { MenuList };