import styles from './Placeholder.module.css';
import { PlaceholderProps } from './types';
import { Button } from '@shared/ui';

/**
 * Generic placeholder for empty states.
 * Supports optional action button with routing or callback.
 */
function Placeholder(props: PlaceholderProps) {
	const {
		content,
		action
	} = props;

	return (
		<div className={styles.placeholder}>
			{content.image}

			<div className={styles.textWrapper}>
				<h3>{content.title}</h3>

				<span className={styles.desc}>
					{content.description}
				</span>
			</div>

			{action && (
				<Button
					to={action.to}
					state={action.state}
					icon={action.icon}
					style={{ backgroundColor: action.color }}
					onClick={action.onClick}
				>
					{action.label}
				</Button>
			)}
		</div>
	);
}

export { Placeholder };