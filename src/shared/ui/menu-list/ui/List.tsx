import styles from './List.module.css';
import { motion } from 'framer-motion';
import { ListItem } from './ListItem';
import type { ListProps } from '../model/types';
import { SectionHeader } from '@shared/ui';

/**
 * Generic list component to render grouped items.
 */
function List(props: ListProps) {
	const {
		title,
		extra,
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
					extra={extra}
				/>
			)}

			<ul
				style={listStyle}
				className={styles.list}
			>
				{items.map((item) => (
					<motion.li key={item.title}>
						<ListItem
							{...item}
							iconSize={iconSize}
							truncateDescription={truncateDescription}
						/>
					</motion.li>
				))}
			</ul>
		</div>
	);
}

export { List };