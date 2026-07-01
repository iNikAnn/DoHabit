import styles from './Placeholder.module.css';
import type { PlaceholderProps } from './types';
import { Button } from '@shared/ui';

/**
 * Generic placeholder.
 * Supports optional action buttons with routing or callback.
 */
function Placeholder(props: PlaceholderProps) {
	const {
		content,
		action
	} = props;

	const actions = action
		? Array.isArray(action) ? action : [action]
		: null;

	return (
		<div className={styles.placeholder}>
			{content.image}

			<div className={styles.textWrapper}>
				<h3>{content.title}</h3>

				<span className={styles.description}>
					{content.description}
				</span>
			</div>

			{actions && (
				<div className={styles.actions}>
					{actions.map(({ label, color, ...rest }) => (
						<Button
							key={label}
							style={{ backgroundColor: color }}
							className={styles.actionButton}
							{...rest}
						>
							{label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}

export { Placeholder };