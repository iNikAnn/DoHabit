import styles from './MenuList.module.css';
import { CSSProperties, ReactNode } from 'react';
import { MenuItemProps } from '../model/types';
import { MenuItem } from './MenuItem';
import { SectionHeader } from '@shared/ui';

interface Props {
	title?: string;
	action?: ReactNode;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
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
							truncateDescription={truncateDescription}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export { MenuList };