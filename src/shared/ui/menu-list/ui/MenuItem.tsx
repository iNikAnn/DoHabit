import styles from './MenuItem.module.css';
import { MenuItemProps } from '../model/types';
import { Button } from '@shared/ui';

/**
 * Individual menu entry component.
 * Wraps content in a Button and supports titles, descriptions, and extra elements.
 */
function MenuItem(props: MenuItemProps) {
	const {
		title,
		description,
		indicator = {},
		extra,
		...rest
	} = props;

	return (
		<Button
			className={styles.menuItem}
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

				<small className={styles.description}>
					{description}
				</small>
			</div>

			<div className={styles.extra}>
				{extra}
			</div>
		</Button>
	);
}

export { MenuItem };