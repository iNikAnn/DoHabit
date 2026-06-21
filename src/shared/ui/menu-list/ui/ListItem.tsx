import styles from './ListItem.module.css';
import clsx from 'clsx';
import type { ListItemProps } from '../model/types';
import { Button } from '@shared/ui';

/**
 * Individual menu entry component.
 * Wraps content in a Button and supports titles, descriptions, and extra elements.
 */
function ListItem(props: ListItemProps) {
	const {
		title,
		description,
		descriptionStyle,
		iconSize,
		truncateDescription,
		indicator = {},
		extra,
		...rest
	} = props;

	return (
		<Button
			className={clsx(
				styles.menuItem,
				iconSize && styles[iconSize]
			)}
			indicator={{
				type: 'none',
				style: {
					color: 'gray',
					width: '20px',
					height: '20px'
				},
				...indicator,
			}}
			{...rest}
		>
			<div className={styles.textWrapper}>
				<h3 className={styles.title}>
					{title}
				</h3>

				{description && (
					<small
						style={descriptionStyle}
						className={clsx(
							styles.description,
							truncateDescription && styles.truncate
						)}
					>
						{description}
					</small>
				)}
			</div>

			{extra && (
				<div className={styles.extra}>
					{extra}
				</div>
			)}
		</Button>
	);
}

export { ListItem };